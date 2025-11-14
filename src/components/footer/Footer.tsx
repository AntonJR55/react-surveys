import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

interface FooterProps {
    isSimplified: boolean;
}

export function Footer({ isSimplified }: FooterProps) {
    if (isSimplified) {
        return (
            <footer className="bg-gray-50 border-t border-gray-200">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
                    <div className="text-center">
                        <p className="text-gray-600 text-sm">
                            © 2025 Система Опросов. Все права защищены.
                        </p>
                    </div>
                </div>
            </footer>
        );
    }

    return (
        <footer className="bg-gray-50 border-t border-gray-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <h3 className="text-gray-900 mb-4">Система Опросов</h3>
                        <p className="text-gray-600 text-sm">
                            Создавайте опросы легко. Получайте точные
                            результаты.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-gray-900 mb-4">О проекте</h4>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-600 hover:text-sky-600 text-sm transition-colors"
                                >
                                    О нас
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-600 hover:text-sky-600 text-sm transition-colors"
                                >
                                    Как это работает
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-600 hover:text-sky-600 text-sm transition-colors"
                                >
                                    Контакты
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-gray-900 mb-4">Поддержка</h4>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-600 hover:text-sky-600 text-sm transition-colors"
                                >
                                    Политика конфиденциальности
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-600 hover:text-sky-600 text-sm transition-colors"
                                >
                                    Условия использования
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-600 hover:text-sky-600 text-sm transition-colors"
                                >
                                    Обратная связь
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-gray-900 mb-4">Социальные сети</h4>
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="text-gray-600 hover:text-sky-600 transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="text-gray-600 hover:text-sky-600 transition-colors"
                                aria-label="Twitter"
                            >
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="text-gray-600 hover:text-sky-600 transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="text-gray-600 hover:text-sky-600 transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                    <p className="text-gray-600 text-sm">
                        © 2025 Система Опросов. Все права защищены.
                    </p>
                </div>
            </div>
        </footer>
    );
}
