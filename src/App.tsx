import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Book, 
  Search, 
  CheckSquare, 
  MessageCircle, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Send,
  Globe,
  CheckCircle2,
  Circle,
  Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import Markdown from 'react-markdown';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { LANGUAGES, TRANSLATIONS, LanguageCode, PROCEDURES, CHECKLISTS } from './constants';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const LanguageSelector = ({ onSelect }: { onSelect: (lang: LanguageCode) => void }) => {
  return (
    <div className="fixed inset-0 bg-zinc-950 flex flex-col items-center justify-center p-6 z-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8"
      >
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white tracking-tight">Dano's Sport Bar</h1>
          <p className="text-zinc-400">Staff Bible Assistant</p>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onSelect(lang.code as LanguageCode)}
              className="flex items-center justify-between p-4 bg-zinc-900 border border-zinc-800 rounded-2xl hover:bg-zinc-800 transition-colors text-left group"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">{lang.flag}</span>
                <span className="text-lg font-medium text-zinc-200 group-hover:text-white">{lang.name}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-zinc-400" />
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const ChatWidget = ({ lang }: { lang: LanguageCode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-exp",
        contents: [
          { 
            role: "user", 
            parts: [{ text: `Você é o tutor do Dano's Sport Bar. Ajude o staff com base nos procedimentos da Staff Bible. Responda no idioma: ${lang}. Pergunta: ${userMsg}` }] 
          }
        ],
      });

      const modelText = response.text || "Desculpe, não consegui processar sua solicitação.";
      setMessages(prev => [...prev, { role: 'model', text: modelText }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Erro ao conectar com o assistente." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-emerald-500 text-white rounded-full shadow-lg flex items-center justify-center z-40 hover:scale-105 active:scale-95 transition-transform"
      >
        <MessageCircle className="w-7 h-7" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed inset-0 md:inset-auto md:bottom-24 md:right-6 md:w-96 md:h-[600px] bg-zinc-900 z-50 flex flex-col md:rounded-3xl shadow-2xl border border-zinc-800 overflow-hidden"
          >
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-white">{t.chat}</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 text-zinc-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-900">
              {messages.length === 0 && (
                <div className="text-center text-zinc-500 mt-10 px-6">
                  Olá! Sou o assistente do Dano's. Como posso ajudar você hoje?
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={cn("flex", msg.role === 'user' ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "max-w-[85%] p-3 rounded-2xl text-sm",
                    msg.role === 'user' ? "bg-emerald-600 text-white rounded-tr-none" : "bg-zinc-800 text-zinc-200 rounded-tl-none"
                  )}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-800 p-3 rounded-2xl rounded-tl-none animate-pulse text-zinc-500 text-xs">
                    Digitando...
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Pergunte algo..."
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="p-2 bg-emerald-500 text-white rounded-xl disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- Main App ---

export default function App() {
  const [lang, setLang] = useState<LanguageCode | null>(null);
  const [activeTab, setActiveTab] = useState<'wiki' | 'search' | 'checklists'>('wiki');
  const [selectedProcedure, setSelectedProcedure] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [checklistStates, setChecklistStates] = useState<Record<string, boolean>>({});

  const t = lang ? TRANSLATIONS[lang] : null;

  const filteredProcedures = useMemo(() => {
    if (!searchQuery || !lang) return [];
    const q = searchQuery.toLowerCase();
    return PROCEDURES.filter(p => 
      (p.title[lang] || p.title.pt).toLowerCase().includes(q) || 
      (p.content[lang] || p.content.pt).toLowerCase().includes(q)
    );
  }, [searchQuery, lang]);

  const toggleChecklist = (id: string) => {
    setChecklistStates(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (!lang || !t) {
    return <LanguageSelector onSelect={setLang} />;
  }

  const renderWiki = () => {
    if (selectedProcedure) {
      const proc = PROCEDURES.find(p => p.id === selectedProcedure);
      return (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-6 pb-32"
        >
          <button 
            onClick={() => setSelectedProcedure(null)}
            className="flex items-center gap-2 text-emerald-500 mb-6 font-medium"
          >
            <ChevronLeft className="w-5 h-5" />
            {t.back}
          </button>
          <div className="prose prose-invert max-w-none">
            <Markdown>{proc ? (proc.content[lang] || proc.content.pt) : "Conteúdo não disponível."}</Markdown>
          </div>
          {/* Placeholder for images */}
          <div className="mt-8 grid grid-cols-1 gap-4">
            <div className="aspect-video bg-zinc-900 rounded-2xl border border-zinc-800 flex items-center justify-center text-zinc-600 text-sm italic">
              Espaço para imagem ilustrativa
            </div>
          </div>
        </motion.div>
      );
    }

    return (
      <div className="p-6 pb-32 space-y-8">
        <header className="space-y-1">
          <h1 className="text-2xl font-bold text-white">{t.procedimentos}</h1>
          <p className="text-zinc-500 text-sm">Wiki do Staff</p>
        </header>

        <div className="space-y-6">
          {/* Category 1: Geral */}
          <section className="space-y-3">
            <h2 className="text-zinc-400 font-semibold text-xs uppercase tracking-wider">{t.categories.geral}</h2>
            <div className="grid grid-cols-1 gap-2">
              {[
                { id: '1.1.1', label: '1.1. Aberturas da Casa' },
                { id: '1.2.1', label: '1.2. Fechos da Casa' },
                { id: '1.3', label: '1.3. Tarefas secundárias' },
                { id: '1.4', label: '1.4. Serviço de Copa' },
              ].map(item => (
                <button 
                  key={item.id}
                  onClick={() => setSelectedProcedure(item.id)}
                  className="flex items-center justify-between p-4 bg-zinc-900/50 border border-zinc-800/50 rounded-2xl hover:bg-zinc-800 transition-colors"
                >
                  <span className="text-zinc-200">{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-zinc-600" />
                </button>
              ))}
            </div>
          </section>

          {/* Category 2: O Serviço */}
          <section className="space-y-3">
            <h2 className="text-zinc-400 font-semibold text-xs uppercase tracking-wider">{t.categories.servico}</h2>
            <div className="grid grid-cols-1 gap-2">
              {[
                { id: '2.1', label: '2.1. Recepção e Boas-vindas' },
                { id: '2.2', label: '2.2. Anotação de Pedidos' },
                { id: '2.3', label: '2.3. Serviço de Bebidas' },
                { id: '2.4', label: '2.4. Serviço de Comida' },
                { id: '2.5', label: '2.5. Fechamento de Conta' },
              ].map(item => (
                <button 
                  key={item.id}
                  onClick={() => setSelectedProcedure(item.id)}
                  className="flex items-center justify-between p-4 bg-zinc-900/50 border border-zinc-800/50 rounded-2xl hover:bg-zinc-800 transition-colors"
                >
                  <span className="text-zinc-200">{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-zinc-600" />
                </button>
              ))}
            </div>
          </section>

          {/* Category 3: Extras */}
          <section className="space-y-3">
            <h2 className="text-zinc-400 font-semibold text-xs uppercase tracking-wider">{t.categories.extras}</h2>
            <div className="grid grid-cols-1 gap-2">
              {[
                { id: '3.1', label: '3.1. Mapas de Sala' },
                { id: '3.2', label: '3.2. Padrão de montagem das mesas' },
                { id: '3.3', label: '3.3. Tabela de alergias' },
                { id: '3.4', label: '3.4. Lista de códigos da casa' },
                { id: '3.5', label: '3.5. Manual de manuseio dos aquecedores' },
                { id: '3.6', label: '3.6. Manual de controle da box MEO TV' },
                { id: '3.7', label: '3.7. Manual de montagem do palco' },
                { id: '3.9', label: '3.9. Guia de Serviço da Guinness' },
                { id: '3.12', label: '3.12. Upselling e Sugestões' },
              ].map(item => (
                <button 
                  key={item.id}
                  onClick={() => setSelectedProcedure(item.id)}
                  className="flex items-center justify-between p-4 bg-zinc-900/50 border border-zinc-800/50 rounded-2xl hover:bg-zinc-800 transition-colors"
                >
                  <span className="text-zinc-200">{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-zinc-600" />
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  };

  const renderSearch = () => (
    <div className="p-6 pb-32 space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold text-white">{t.busca}</h1>
        <p className="text-zinc-500 text-sm">Pesquisa rápida</p>
      </header>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
        <input
          autoFocus
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500 transition-colors"
        />
      </div>

      <div className="space-y-3">
        {searchQuery && filteredProcedures.length === 0 && (
          <div className="text-center py-12 text-zinc-600">
            Nenhum resultado encontrado para "{searchQuery}"
          </div>
        )}
        {filteredProcedures.map(proc => (
          <button
            key={proc.id}
            onClick={() => {
              setSelectedProcedure(proc.id);
              setActiveTab('wiki');
            }}
            className="w-full text-left p-4 bg-zinc-900 border border-zinc-800 rounded-2xl hover:bg-zinc-800 transition-colors"
          >
            <div className="font-medium text-zinc-200 mb-1">{proc.title[lang] || proc.title.pt}</div>
            <div className="text-xs text-zinc-500 line-clamp-2">
              {(proc.content[lang] || proc.content.pt).replace(/[#*]/g, '')}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderChecklists = () => (
    <div className="p-6 pb-32 space-y-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold text-white">{t.checklists}</h1>
        <p className="text-zinc-500 text-sm">Tarefas diárias</p>
      </header>

      <div className="space-y-8">
        {CHECKLISTS.map(list => (
          <div key={list.id} className="space-y-3">
            <h3 className="text-zinc-400 font-semibold text-sm">{list.title[lang] || list.title.pt}</h3>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
              {list.items.map(item => {
                const isChecked = checklistStates[`${list.id}-${item.id}`];
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleChecklist(`${list.id}-${item.id}`)}
                    className="w-full flex items-center gap-4 p-4 border-b border-zinc-800 last:border-0 hover:bg-zinc-800/50 transition-colors text-left"
                  >
                    {isChecked ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    ) : (
                      <Circle className="w-6 h-6 text-zinc-700" />
                    )}
                    <span className={cn(
                      "text-zinc-200 transition-all",
                      isChecked && "text-zinc-600 line-through"
                    )}>
                      {item.text[lang] || item.text.pt}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-zinc-200 font-sans selection:bg-emerald-500/30">
      <main className="max-w-md mx-auto min-h-screen relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'wiki' && renderWiki()}
            {activeTab === 'search' && renderSearch()}
            {activeTab === 'checklists' && renderChecklists()}
          </motion.div>
        </AnimatePresence>

        <ChatWidget lang={lang} />

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-zinc-950/80 backdrop-blur-xl border-t border-zinc-800 z-40">
          <div className="max-w-md mx-auto flex items-center justify-around p-4">
            <button
              onClick={() => { setActiveTab('wiki'); setSelectedProcedure(null); }}
              className={cn(
                "flex flex-col items-center gap-1 transition-colors",
                activeTab === 'wiki' ? "text-emerald-500" : "text-zinc-500"
              )}
            >
              <Book className="w-6 h-6" />
              <span className="text-[10px] font-medium uppercase tracking-widest">{t.procedimentos}</span>
            </button>
            <button
              onClick={() => setActiveTab('search')}
              className={cn(
                "flex flex-col items-center gap-1 transition-colors",
                activeTab === 'search' ? "text-emerald-500" : "text-zinc-500"
              )}
            >
              <Search className="w-6 h-6" />
              <span className="text-[10px] font-medium uppercase tracking-widest">{t.busca}</span>
            </button>
            <button
              onClick={() => setActiveTab('checklists')}
              className={cn(
                "flex flex-col items-center gap-1 transition-colors",
                activeTab === 'checklists' ? "text-emerald-500" : "text-zinc-500"
              )}
            >
              <CheckSquare className="w-6 h-6" />
              <span className="text-[10px] font-medium uppercase tracking-widest">{t.checklists}</span>
            </button>
          </div>
        </nav>
      </main>
    </div>
  );
                  }
