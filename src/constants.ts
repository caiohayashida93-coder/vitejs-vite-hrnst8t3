import { GoogleGenAI } from "@google/genai";

// Language options
export const LANGUAGES = [
  { code: 'pt', name: 'Portugal', flag: '🇵🇹' },
  { code: 'en', name: 'Reino Unido', flag: '🇬🇧' },
  { code: 'es', name: 'Espanha', flag: '🇪🇸' },
  { code: 'fr', name: 'França', flag: '🇫🇷' },
  { code: 'de', name: 'Alemanha', flag: '🇩🇪' },
  { code: 'ru', name: 'Rússia', flag: '🇷🇺' },
  { code: 'bn', name: 'Bangladesh', flag: '🇧🇩' },
];

export type LanguageCode = 'pt' | 'en' | 'es' | 'fr' | 'de' | 'ru' | 'bn';

export const TRANSLATIONS: Record<LanguageCode, any> = {
  pt: {
    welcome: "Bem-vindo ao Dano's Staff Bible",
    selectLanguage: "Selecione o seu idioma",
    procedimentos: "Procedimentos",
    busca: "Busca",
    checklists: "Checklists",
    chat: "Assistente Dano's",
    searchPlaceholder: "Pesquisar procedimentos...",
    back: "Voltar",
    categories: {
      geral: "1. Geral",
      servico: "2. O Serviço",
      extras: "3. Extras"
    }
  },
  en: {
    welcome: "Welcome to Dano's Staff Bible",
    selectLanguage: "Select your language",
    procedimentos: "Procedures",
    busca: "Search",
    checklists: "Checklists",
    chat: "Dano's Assistant",
    searchPlaceholder: "Search procedures...",
    back: "Back",
    categories: {
      geral: "1. General",
      servico: "2. The Service",
      extras: "3. Extras"
    }
  },
  es: {
    welcome: "Bienvenido a Dano's Staff Bible",
    selectLanguage: "Seleccione su idioma",
    procedimentos: "Procedimientos",
    busca: "Buscar",
    checklists: "Listas de verificación",
    chat: "Asistente de Dano's",
    searchPlaceholder: "Buscar procedimientos...",
    back: "Volver",
    categories: {
      geral: "1. General",
      servico: "2. El Servicio",
      extras: "3. Extras"
    }
  },
  fr: {
    welcome: "Bienvenue sur Dano's Staff Bible",
    selectLanguage: "Sélectionnez votre langue",
    procedimentos: "Procédures",
    busca: "Recherche",
    checklists: "Listes de contrôle",
    chat: "Assistant Dano's",
    searchPlaceholder: "Rechercher des procédures...",
    back: "Retour",
    categories: {
      geral: "1. Général",
      servico: "2. Le Service",
      extras: "3. Extras"
    }
  },
  de: {
    welcome: "Willkommen bei Dano's Staff Bible",
    selectLanguage: "Sprache wählen",
    procedimentos: "Verfahren",
    busca: "Suche",
    checklists: "Checklisten",
    chat: "Dano's Assistent",
    searchPlaceholder: "Verfahren suchen...",
    back: "Zurück",
    categories: {
      geral: "1. Allgemein",
      servico: "2. Der Service",
      extras: "3. Extras"
    }
  },
  ru: {
    welcome: "Добро пожаловать в Dano's Staff Bible",
    selectLanguage: "Выберите язык",
    procedimentos: "Процедуры",
    busca: "Поиск",
    checklists: "Чек-листы",
    chat: "Ассистент Dano's",
    searchPlaceholder: "Поиск процедур...",
    back: "Назад",
    categories: {
      geral: "1. Общее",
      servico: "2. Сервис",
      extras: "3. Дополнительно"
    }
  },
  bn: {
    welcome: "Dano's Staff Bible-এ স্বাগতম",
    selectLanguage: "আপনার ভাষা নির্বাচন করুন",
    procedimentos: "পদ্ধতি",
    busca: "অনুসন্ধান",
    checklists: "চেকলিস্ট",
    chat: "Dano's সহকারী",
    searchPlaceholder: "পদ্ধতি অনুসন্ধান করুন...",
    back: "ফিরে যান",
    categories: {
      geral: "১. সাধারণ",
      servico: "২. পরিষেবা",
      extras: "৩. অতিরিক্ত"
    }
  }
};

export const PROCEDURES = [
  // 1. Geral
  {
    id: '1.1.1',
    category: 'geral',
    title: { pt: '1.1.1. Geral e Sala (Abertura)', en: '1.1.1. General and Dining Room (Opening)' },
    content: { 
      pt: '# Abertura Geral e Sala\n\n- **Luzes**: Ligar todas as luzes da sala e esplanada.\n- **Mesas**: Verificar se todas as mesas estão limpas e alinhadas.\n- **Esplanada**: Montar guarda-sóis e almofadas.\n- **Menus**: Limpar e organizar menus no host desk.', 
      en: '# General and Dining Room Opening\n\n- **Lights**: Turn on all dining room and terrace lights.\n- **Tables**: Check if all tables are clean and aligned.\n- **Terrace**: Set up umbrellas and cushions.\n- **Menus**: Clean and organize menus at the host desk.' 
    }
  },
  {
    id: '1.1.2',
    category: 'geral',
    title: { pt: '1.1.2. Bar (Abertura)', en: '1.1.2. Bar (Opening)' },
    content: { pt: '# Abertura do Bar\n\n- Ligar máquinas de café.\n- Preparar guarnições (limão, lima, etc).\n- Verificar stocks de bebidas frescas.', en: '# Bar Opening\n\n- Turn on coffee machines.\n- Prepare garnishes (lemon, lime, etc).\n- Check cold beverage stocks.' }
  },
  {
    id: '1.1.3',
    category: 'geral',
    title: { pt: '1.1.3. Kiosk (Abertura)', en: '1.1.3. Kiosk (Opening)' },
    content: { pt: '# Abertura do Kiosk\n\n- Abrir portadas.\n- Ligar POS.\n- Preparar stock de gelados e bebidas.', en: '# Kiosk Opening\n\n- Open shutters.\n- Turn on POS.\n- Prepare ice cream and beverage stock.' }
  },
  {
    id: '1.2.1',
    category: 'geral',
    title: { pt: '1.2.1. Geral e Sala (Fecho)', en: '1.2.1. General and Dining Room (Closing)' },
    content: { pt: '# Fecho Geral e Sala\n\n- Limpar todas as superfícies.\n- Recolher esplanada.\n- Desligar luzes não essenciais.', en: '# General and Dining Room Closing\n\n- Clean all surfaces.\n- Collect terrace items.\n- Turn off non-essential lights.' }
  },
  {
    id: '1.3',
    category: 'geral',
    title: { pt: '1.3. Tarefas secundárias', en: '1.3. Secondary Tasks' },
    content: { pt: '# Tarefas Secundárias\n\n- Limpeza de vidros.\n- Polimento de talheres.\n- Organização de guardanapos.', en: '# Secondary Tasks\n\n- Window cleaning.\n- Cutlery polishing.\n- Napkin organization.' }
  },
  {
    id: '1.4',
    category: 'geral',
    title: { pt: '1.4. Serviço de Copa', en: '1.4. Pantry Service' },
    content: { pt: '# Serviço de Copa\n\n- Gestão de loiça suja.\n- Reposição de material limpo.\n- Limpeza da zona de lavagem.', en: '# Pantry Service\n\n- Dirty dish management.\n- Clean material replenishment.\n- Washing area cleaning.' }
  },

  // 2. O Serviço
  {
    id: '2.1',
    category: 'servico',
    title: { pt: '2.1. Recepção e Boas-vindas', en: '2.1. Reception and Welcome' },
    content: { pt: '# Recepção e Boas-vindas\n\n- Sorrir sempre.\n- Cumprimentar o cliente em menos de 30 segundos.\n- Perguntar se tem reserva.', en: '# Reception and Welcome\n\n- Always smile.\n- Greet the customer in less than 30 seconds.\n- Ask if they have a reservation.' }
  },
  {
    id: '2.2',
    category: 'servico',
    title: { pt: '2.2. Anotação de Pedidos', en: '2.2. Taking Orders' },
    content: { pt: '# Anotação de Pedidos\n\n- Sugerir entradas e bebidas.\n- Repetir o pedido para confirmar.\n- Introduzir no POS imediatamente.', en: '# Taking Orders\n\n- Suggest appetizers and drinks.\n- Repeat the order to confirm.\n- Enter into POS immediately.' }
  },
  {
    id: '2.3',
    category: 'servico',
    title: { pt: '2.3. Serviço de Bebidas', en: '2.3. Beverage Service' },
    content: { pt: '# Serviço de Bebidas\n\n- Servir pelo lado direito.\n- Rótulos virados para o cliente.\n- Copos adequados para cada bebida.', en: '# Beverage Service\n\n- Serve from the right side.\n- Labels facing the customer.\n- Appropriate glasses for each drink.' }
  },
  {
    id: '2.4',
    category: 'servico',
    title: { pt: '2.4. Serviço de Comida', en: '2.4. Food Service' },
    content: { pt: '# Serviço de Comida\n\n- Servir todos ao mesmo tempo.\n- Identificar o prato ao colocar na mesa.\n- Desejar bom apetite.', en: '# Food Service\n\n- Serve everyone at the same time.\n- Identify the dish when placing it on the table.\n- Wish them a good meal.' }
  },
  {
    id: '2.5',
    category: 'servico',
    title: { pt: '2.5. Fechamento de Conta', en: '2.5. Closing the Bill' },
    content: { pt: '# Fechamento de Conta\n\n- Perguntar se desejam café ou sobremesa.\n- Trazer a conta rapidamente.\n- Agradecer a visita.', en: '# Closing the Bill\n\n- Ask if they want coffee or dessert.\n- Bring the bill quickly.\n- Thank them for the visit.' }
  },

  // 3. Extras
  {
    id: '3.1',
    category: 'extras',
    title: { pt: '3.1. Mapas de Sala', en: '3.1. Floor Plans' },
    content: { pt: '# Mapas de Sala\n\nConsulte o mapa físico no host desk para numeração exata das mesas.', en: '# Floor Plans\n\nCheck the physical map at the host desk for exact table numbering.' }
  },
  {
    id: '3.2',
    category: 'extras',
    title: { pt: '3.2. Padrão de montagem das mesas', en: '3.2. Table Setting Standard' },
    content: { pt: '# Padrão de Montagem\n\n- Faca à direita, garfo à esquerda.\n- Guardanapo ao centro.\n- Copo de água acima da faca.', en: '# Setting Standard\n\n- Knife on the right, fork on the left.\n- Napkin in the center.\n- Water glass above the knife.' }
  },
  {
    id: '3.3',
    category: 'extras',
    title: { pt: '3.3. Tabela de alergias', en: '3.3. Allergy Chart' },
    content: { pt: '# Tabela de Alergias\n\nConsulte o manual de alérgenos na cozinha para cada prato do menu.', en: '# Allergy Chart\n\nCheck the allergen manual in the kitchen for each dish on the menu.' }
  },
  {
    id: '3.4',
    category: 'extras',
    title: { pt: '3.4. Lista de códigos da casa', en: '3.4. House Codes List' },
    content: { pt: '# Códigos da Casa\n\n- **Código Alarme**: 1234\n- **Código Wi-Fi Staff**: DanoStaff2024', en: '# House Codes\n\n- **Alarm Code**: 1234\n- **Staff Wi-Fi Code**: DanoStaff2024' }
  },
  {
    id: '3.5',
    category: 'extras',
    title: { pt: '3.5. Manual de manuseio dos aquecedores', en: '3.5. Heater Handling Manual' },
    content: { pt: '# Manuseio de Aquecedores\n\n1. Abrir válvula de gás.\n2. Pressionar botão de ignição por 10 segundos.\n3. Rodar para nível desejado.', en: '# Heater Handling\n\n1. Open gas valve.\n2. Press ignition button for 10 seconds.\n3. Turn to desired level.' }
  },
  {
    id: '3.6',
    category: 'extras',
    title: { pt: '3.6. Manual de controle da box MEO TV', en: '3.6. MEO TV Box Control Manual' },
    content: { pt: '# Controle MEO TV\n\n- Usar o comando preto para mudar canais desportivos.\n- Canal 11: Futebol Nacional.\n- Canal 20: Eurosport.', en: '# MEO TV Control\n\n- Use the black remote to change sports channels.\n- Channel 11: National Football.\n- Channel 20: Eurosport.' }
  },
  {
    id: '3.7',
    category: 'extras',
    title: { pt: '3.7. Manual de montagem do palco', en: '3.7. Stage Assembly Manual' },
    content: { pt: '# Montagem do Palco\n\n- Unir as 4 plataformas.\n- Fixar os pés niveladores.\n- Colocar a saia de palco preta.', en: '# Stage Assembly\n\n- Join the 4 platforms.\n- Fix the leveling feet.\n- Place the black stage skirt.' }
  },
  {
    id: '3.9',
    category: 'extras',
    title: { pt: '3.9. Guia de Serviço da Guinness', en: '3.9. Guinness Service Guide' },
    content: { pt: '# Serviço da Guinness\n\n1. Copo limpo a 45 graus.\n2. Encher até 3/4.\n3. Deixar repousar (surge).\n4. Completar com o topo cremoso.', en: '# Guinness Service\n\n1. Clean glass at 45 degrees.\n2. Fill to 3/4.\n3. Let it settle (surge).\n4. Top up with creamy head.' }
  },
  {
    id: '3.12',
    category: 'extras',
    title: { pt: '3.12. Upselling e Sugestões', en: '3.12. Upselling and Suggestions' },
    content: { pt: '# Upselling\n\n- "Gostaria de acompanhar com as nossas batatas artesanais?"\n- "Para sobremesa, recomendo o nosso Cheesecake de Oreo."', en: '# Upselling\n\n- "Would you like to accompany that with our artisanal fries?"\n- "For dessert, I recommend our Oreo Cheesecake."' }
  }
];

export const CHECKLISTS = [
  {
    id: 'opening-bar',
    title: { pt: 'Checklist Abertura de Bar', en: 'Bar Opening Checklist' },
    items: [
      { id: 'item1', text: { pt: 'Ligar máquinas de café', en: 'Turn on coffee machines' } },
      { id: 'item2', text: { pt: 'Verificar stocks de gelo', en: 'Check ice stocks' } },
      { id: 'item3', text: { pt: 'Preparar frutas e guarnições', en: 'Prepare fruits and garnishes' } },
      { id: 'item4', text: { pt: 'Verificar validade de sumos abertos', en: 'Check expiration of open juices' } },
    ]
  },
  {
    id: 'closing-kiosk',
    title: { pt: 'Checklist Fecho do Kiosk', en: 'Kiosk Closing Checklist' },
    items: [
      { id: 'item1', text: { pt: 'Limpar balcão e POS', en: 'Clean counter and POS' } },
      { id: 'item2', text: { pt: 'Recolher cadeiras e mesas', en: 'Collect chairs and tables' } },
      { id: 'item3', text: { pt: 'Desligar luzes e equipamentos', en: 'Turn off lights and equipment' } },
      { id: 'item4', text: { pt: 'Trancar portadas', en: 'Lock shutters' } },
    ]
  },
  {
    id: 'opening-room',
    title: { pt: 'Checklist Abertura de Sala', en: 'Dining Room Opening Checklist' },
    items: [
      { id: 'item1', text: { pt: 'Varrer e limpar chão', en: 'Sweep and clean floor' } },
      { id: 'item2', text: { pt: 'Alinhar mesas e cadeiras', en: 'Align tables and chairs' } },
      { id: 'item3', text: { pt: 'Preparar estações de serviço', en: 'Prepare service stations' } },
    ]
  }
];

