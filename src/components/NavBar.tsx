import classNames from 'classnames';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SideMenu from 'components/SideMenu';
import { ReactComponent as LogoSVG } from 'static/icons/logo.svg';
import { ReactComponent as MenuSVG } from 'static/icons/menu.svg';
import ThemeChanger from './ThemeChanger';

const NavBar = (props: {
	shadow: boolean;
	noShadow: boolean | undefined;
	sideMenu: boolean | undefined;
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<>
			<nav className="max-w-screen-2xl mx-auto w-full h-16 flex items-center">
				<ul className="w-full horizontal space-between">
					<li>
						<Link to={sessionStorage.getItem('token') ? '/main' : '/'}>
							<LogoSVG
								className={classNames(
									'w-10 h-10 inline-block md:w-12 md:h-12 dark:text-main',
									{
										'text-white': props.shadow && !props.noShadow,
										'text-main': !props.shadow || props.noShadow,
									}
								)}
							/>
						</Link>
					</li>
					{props.sideMenu && (
						<li>
							<span
								className="cursor-pointer xs:hidden md:block"
								onClick={() => setIsOpen(true)}
							>
								<MenuSVG
									className={classNames('w-6 h-6 inline-block', {
										'text-white': props.shadow && !props.noShadow,
										'text-default': !props.shadow || props.noShadow,
									})}
								/>
							</span>
						</li>
					)}
					<li className="md:hidden absolute right-8 xs:right-4">
						<ThemeChanger shadow={props.shadow} noShadow={props.noShadow} />
					</li>
				</ul>
			</nav>
			<SideMenu isOpen={isOpen} setIsOpen={setIsOpen} />
		</>
	);
};

export default NavBar;
