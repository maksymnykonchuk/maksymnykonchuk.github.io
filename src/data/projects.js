export const projects = [
  {
    id: 'fishtrader',
    featured: true,
    inDevelopment: true,
    name: { uk: 'FishTrader', en: 'FishTrader' },
    content: {
      uk: {
        type: 'B2B-платформа',
        description: 'Платформа для торгівлі рибною продукцією.',
        role: 'Доопрацьовую наявну платформу.',
        availability: 'Платформу можна переглянути.',
        tasks: [
          'Доопрацьовував реєстрацію користувачів і профілі продавців.',
          'Налаштовував каталог і вдосконалював оголошення.',
          'Доопрацьовував відображення товарів, цін і статусів.',
          'Працював з API платформи.',
        ],
      },
      en: {
        type: 'B2B platform',
        description: 'A platform for trading fish products.',
        role: 'I’m improving the existing platform.',
        availability: 'The platform is available to browse.',
        tasks: [
          'Updated user registration and seller profiles.',
          'Configured the catalog and improved listings.',
          'Updated how products, prices, and statuses were displayed.',
          'Worked with the platform API.',
        ],
      },
    },
    technologies: [],
    screenshots: [],
    link: null,
  },
  {
    id: 'woocommerce',
    inDevelopment: true,
    name: { uk: 'WooCommerce-магазин', en: 'WooCommerce store' },
    content: {
      uk: {
        type: 'Інтернет-магазин',
        description: 'Комерційний магазин на WordPress. Працював із товарами та оформленням замовлень.',
        role: 'Доопрацьовував наявний магазин.',
        availability: 'Магазин можна переглянути.',
        tasks: [
          'Працював із варіативними товарами й налаштовував поля ACF.',
          'Додавав логіку на PHP, зокрема додаткові розрахунки та функції оформлення замовлень.',
          'Працював із REST API магазину.',
        ],
      },
      en: {
        type: 'Online store',
        description: 'A commercial WordPress store. I worked on products and checkout.',
        role: 'I made changes to an existing store.',
        availability: 'The store is available to browse.',
        tasks: [
          'Worked with variable products and configured ACF fields.',
          'Added PHP logic for additional calculations and checkout features.',
          'Worked with the store’s REST API.',
        ],
      },
    },
    technologies: ['WordPress', 'WooCommerce', 'ACF', 'PHP', 'REST API'],
    screenshots: [],
    link: null,
  },
  {
    id: 'm-cargoo',
    name: { uk: 'M_Cargoo', en: 'M_Cargoo' },
    content: {
      uk: {
        type: 'Сайт транспортної компанії',
        description: 'Сайт вантажних перевезень із каталогом транспорту, який я розробив кілька років тому.',
        role: 'Самостійно спроєктував і розробив сайт.',
        tasks: [
          'Створив головну сторінку з презентацією компанії та секцію послуг вантажних перевезень.',
          'Зібрав каталог транспорту з модальними вікнами для перегляду характеристик.',
          'Додав блок відгуків, інформаційні секції та контакти.',
        ],
      },
      en: {
        type: 'Transport company website',
        description: 'A freight transport website with a vehicle catalog that I built several years ago.',
        role: 'I designed and built the entire site independently.',
        tasks: [
          'Built the company homepage and a section for freight services.',
          'Built a vehicle catalog with modal windows for viewing specifications.',
          'Added a reviews section, informational sections, and contact details.',
        ],
      },
    },
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
    screenshots: [
      {
        src: '/images/m-cargoo-home.png',
        width: 4740,
        height: 8878,
        preview: 'wide-top',
        alt: {
          uk: 'Головна сторінка сайту M_Cargoo',
          en: 'M_Cargoo homepage',
        },
      },
    ],
    link: null,
  },
]
