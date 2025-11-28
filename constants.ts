import { MetabolismType, Question, ResultContent } from './types';

// ЗАМЕНИТЕ ЭТУ ССЫЛКУ НА РЕАЛЬНУЮ ССЫЛКУ ВАШЕГО БОТА
// Например: https://t.me/MyMetabolismBot?start=quiz_result
export const TELEGRAM_BOT_URL = 'https://t.me/YourBotName_bot';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Как вы оцениваете свой уровень энергии в течение дня?",
    options: [
      { id: 'A', text: "Энергии много, но резко падает после еды.", impacts: [{ type: MetabolismType.INSULIN, points: 3 }] },
      { id: 'B', text: "Постоянная вялость, медленно раскачиваюсь утром.", impacts: [{ type: MetabolismType.THYROID, points: 3 }] },
      { id: 'C', text: "Постоянное напряжение, усталость, которая не проходит после сна.", impacts: [{ type: MetabolismType.CORTISOL, points: 3 }] },
      { id: 'D', text: "Энергия скачет в зависимости от настроения или гормонального цикла.", impacts: [{ type: MetabolismType.HORMONAL, points: 3 }] },
      { id: 'E', text: "Сильная усталость после еды или вздутие.", impacts: [{ type: MetabolismType.INFLAMMATORY, points: 3 }] },
    ]
  },
  {
    id: 2,
    text: "Что вы чаще всего переедаете или не можете контролировать?",
    options: [
      { id: 'A', text: "Сладости, выпечка, мучное, сладкие напитки.", impacts: [{ type: MetabolismType.INSULIN, points: 3 }] },
      { id: 'B', text: "Мне всегда холодно, тянет на горячее и жирное.", impacts: [{ type: MetabolismType.THYROID, points: 3 }] },
      { id: 'C', text: "Соленые закуски, чипсы, фастфуд.", impacts: [{ type: MetabolismType.CORTISOL, points: 3 }] },
      { id: 'D', text: "Эмоционально отношусь к еде, тяга меняется в течение месяца.", impacts: [{ type: MetabolismType.HORMONAL, points: 3 }] },
      { id: 'E', text: "Чувствую тяжесть после многих продуктов, которые раньше ел/а.", impacts: [{ type: MetabolismType.INFLAMMATORY, points: 3 }] },
    ]
  },
  {
    id: 3,
    text: "Как вы спите?",
    options: [
      { id: 'A', text: "Сплю хорошо, но иногда просыпаюсь с сильным голодом.", impacts: [{ type: MetabolismType.INSULIN, points: 2 }] },
      { id: 'B', text: "Сложно заснуть, просыпаюсь рано утром и чувствую усталость.", impacts: [{ type: MetabolismType.THYROID, points: 2 }] },
      { id: 'C', text: "Часто просыпаюсь в 2-4 часа ночи с чувством тревоги, не могу уснуть.", impacts: [{ type: MetabolismType.CORTISOL, points: 2 }] },
      { id: 'D', text: "Беспокойный сон, ночные приливы или сильное потоотделение.", impacts: [{ type: MetabolismType.HORMONAL, points: 2 }] },
      { id: 'E', text: "Сон прерывается из-за изжоги или ночной потребности в туалет.", impacts: [{ type: MetabolismType.INFLAMMATORY, points: 2 }] },
    ]
  },
  {
    id: 4,
    text: "Где в первую очередь накапливается жир на вашем теле?",
    options: [
      { id: 'A', text: "Вокруг талии (живот 'спасательный круг').", impacts: [{ type: MetabolismType.INSULIN, points: 2 }] },
      { id: 'B', text: "Общая, равномерная полнота.", impacts: [{ type: MetabolismType.THYROID, points: 2 }] },
      { id: 'C', text: "Верхняя часть тела, спина, лицо.", impacts: [{ type: MetabolismType.CORTISOL, points: 2 }] },
      { id: 'D', text: "Бедра, ягодицы, грудь.", impacts: [{ type: MetabolismType.HORMONAL, points: 2 }] },
      { id: 'E', text: "Живот вздутый, ощущается 'твердым' или болезненным.", impacts: [{ type: MetabolismType.INFLAMMATORY, points: 2 }] },
    ]
  },
  {
    id: 5,
    text: "Как часто вы испытываете проблемы с пищеварением (вздутие, газы, дискомфорт)?",
    options: [
      { id: 'A', text: "Редко.", impacts: [] }, // 0 points
      { id: 'B', text: "Иногда, особенно после молочных или глютеносодержащих продуктов.", impacts: [{ type: MetabolismType.INFLAMMATORY, points: 2 }] },
      { id: 'C', text: "Почти каждый день.", impacts: [{ type: MetabolismType.INFLAMMATORY, points: 4 }] },
    ]
  },
];

export const RESULTS: Record<MetabolismType, ResultContent> = {
  [MetabolismType.INSULIN]: {
    title: "Инсулиновый Тип",
    description: "Наблюдаются проблемы с сахаром и возможная резистентность к инсулину. Ваш организм склонен запасать энергию быстро, но испытывает трудности с её эффективным расходом.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
  },
  [MetabolismType.THYROID]: {
    title: "Тиреоидный Тип",
    description: "Замедленный метаболизм, вероятно связанный с функцией щитовидной железы. Это часто приводит к общей усталости и равномерному набору веса.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
  },
  [MetabolismType.CORTISOL]: {
    title: "Кортизольный Тип",
    description: "Основной фактор блокировки — хронический стресс и дисбаланс надпочечников. Ваше тело находится в режиме 'бей или беги', накапливая запасы 'на черный день'.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
  },
  [MetabolismType.HORMONAL]: {
    title: "Гормональный Тип",
    description: "Дисбаланс половых гормонов (эстроген, прогестерон). Метаболизм сильно зависит от циклов организма и эмоционального состояния.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
  },
  [MetabolismType.INFLAMMATORY]: {
    title: "Воспалительный Тип",
    description: "Проблемы с кишечником, хроническое воспаление и возможная пищевая непереносимость. Метаболизм блокируется из-за постоянной нагрузки на иммунную систему.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
  },
};