import {
	ClipboardList,
	Users,
	BarChart3,
	BookOpen,
	Shield,
} from "lucide-react";

interface MainPageProps {
	onNavigate?: (page: "auth") => void;
}

export function MainPage({ onNavigate }: MainPageProps) {
	return (
		<div className="min-h-[calc(100vh-theme(spacing.16)-theme(spacing.16))]">
			{/* Hero Section */}
			<section className="bg-gradient-to-br from-sky-50 to-blue-50 py-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
					<h1 className="text-gray-900 mb-6">
						Система Опросов для Университета
					</h1>
					<p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
						Современная платформа для создания, прохождения и
						анализа опросов. Удобное управление опросами для
						преподавателей, простое прохождение для студентов.
					</p>
					<div className="flex gap-4 justify-center">
						{/* <Button 
              onClick={() => onNavigate?.('auth')}
              className="bg-sky-500 hover:bg-sky-600"
              size="lg"
            >
              Войти в систему
            </Button> */}
					</div>
				</div>
			</section>

			{/* Features */}
			<section className="py-20 bg-white">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-gray-900 mb-4">
							Возможности системы
						</h2>
						<p className="text-gray-600 text-lg">
							Простое и эффективное решение для всех участников
							учебного процесса
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{/* For Students */}
						{/* <Card className="border-2 hover:border-sky-200 transition-colors">
              <CardContent className="pt-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-sky-100 flex items-center justify-center">
                  <Users className="h-6 w-6 text-sky-600" />
                </div>
                <h3 className="text-gray-900">Для студентов</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Прохождение опросов онлайн</li>
                  <li>• Просмотр доступных опросов</li>
                  <li>• История пройденных опросов</li>
                  <li>• Просмотр своих результатов</li>
                </ul>
              </CardContent>
            </Card> */}

						{/* For Teachers */}
						{/* <Card className="border-2 hover:border-sky-200 transition-colors">
              <CardContent className="pt-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-gray-900">Для преподавателей</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Создание опросов для групп</li>
                  <li>• Управление опросами</li>
                  <li>• Просмотр результатов</li>
                  <li>• Экспорт данных в Excel</li>
                </ul>
              </CardContent>
            </Card> */}

						{/* For Admins */}
						{/* <Card className="border-2 hover:border-sky-200 transition-colors">
              <CardContent className="pt-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-gray-900">Для администраторов</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Управление пользователями</li>
                  <li>• Управление группами</li>
                  <li>• Управление дисциплинами</li>
                  <li>• Просмотр всех опросов</li>
                </ul>
              </CardContent>
            </Card> */}
					</div>
				</div>
			</section>

			{/* Benefits */}
			<section className="py-20 bg-gray-50">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-gray-900 mb-4">Преимущества</h2>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						<div className="text-center">
							<div className="h-16 w-16 rounded-full bg-sky-100 flex items-center justify-center mx-auto mb-4">
								<ClipboardList className="h-8 w-8 text-sky-600" />
							</div>
							<h3 className="text-gray-900 mb-2">
								Простота использования
							</h3>
							<p className="text-gray-600">
								Интуитивный интерфейс для создания и прохождения
								опросов
							</p>
						</div>

						<div className="text-center">
							<div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
								<BarChart3 className="h-8 w-8 text-green-600" />
							</div>
							<h3 className="text-gray-900 mb-2">
								Мощная аналитика
							</h3>
							<p className="text-gray-600">
								Детальная статистика и визуализация результатов
								опросов
							</p>
						</div>

						<div className="text-center">
							<div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
								<Shield className="h-8 w-8 text-purple-600" />
							</div>
							<h3 className="text-gray-900 mb-2">Безопасность</h3>
							<p className="text-gray-600">
								Защита данных и разграничение прав доступа
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="py-20 bg-sky-500">
				<div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-white mb-4">
						Начните использовать систему уже сегодня
					</h2>
					<p className="text-sky-100 text-lg mb-8">
						Войдите в систему, используя свои учетные данные
						университета
					</p>
					{/* <Button 
            onClick={() => onNavigate?.('auth')}
            size="lg"
            className="bg-white text-sky-600 hover:bg-gray-100"
          >
            Войти в систему
          </Button> */}
				</div>
			</section>
		</div>
	);
}
