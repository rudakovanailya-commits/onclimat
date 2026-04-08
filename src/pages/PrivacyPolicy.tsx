import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-background text-foreground">
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link to="/">
        <Button variant="ghost" className="mb-8 gap-2">
          <ArrowLeft className="w-4 h-4" />
          На главную
        </Button>
      </Link>

      <h1 className="text-3xl font-bold mb-8">Политика конфиденциальности</h1>

      <div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Общие положения</h2>
          <p>
            Настоящая политика конфиденциальности определяет порядок обработки и защиты
            персональных данных пользователей сайта компании «OnКлимат» (далее — Оператор).
          </p>
          <p>
            Используя сайт и предоставляя свои персональные данные, вы даёте согласие на их
            обработку в соответствии с данной политикой.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Какие данные мы собираем</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Имя</li>
            <li>Номер телефона</li>
            <li>Город проживания (при указании)</li>
            <li>Описание задачи / потребности</li>
            <li>Переписка в онлайн-чате</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Цели обработки данных</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Обработка заявок и обратная связь с клиентом</li>
            <li>Подбор климатического оборудования</li>
            <li>Расчёт стоимости монтажа и услуг</li>
            <li>Улучшение качества обслуживания</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Защита данных</h2>
          <p>
            Оператор принимает необходимые организационные и технические меры для защиты
            персональных данных от неправомерного доступа, уничтожения, изменения,
            блокирования, копирования и распространения.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Сроки хранения</h2>
          <p>
            Персональные данные хранятся в течение срока, необходимого для достижения целей
            обработки, но не более 3 лет с момента последнего взаимодействия с пользователем.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">6. Права пользователя</h2>
          <p>Вы имеете право:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Запросить информацию об обработке ваших данных</li>
            <li>Потребовать уточнения, блокирования или удаления данных</li>
            <li>Отозвать согласие на обработку персональных данных</li>
          </ul>
          <p className="mt-2">
            Для реализации своих прав обратитесь к нам по контактным данным, указанным на сайте.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">7. Передача данных третьим лицам</h2>
          <p>
            Оператор не передаёт персональные данные третьим лицам, за исключением случаев,
            предусмотренных законодательством Российской Федерации.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">8. Изменение политики</h2>
          <p>
            Оператор оставляет за собой право вносить изменения в настоящую политику.
            Актуальная версия всегда доступна на данной странице.
          </p>
        </section>
      </div>
    </div>
  </div>
);

export default PrivacyPolicy;
