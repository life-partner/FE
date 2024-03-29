import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<footer>
			<div className="max-w-screen-2xl mx-auto w-full h-full vertical justify-between">
				<ul className="vertical space-y-6 md:horizontal md:items-center md:space-x-6 md:space-y-0">
					<li className="dark:text-white font-bold text-lg">
						<Link to="/" className="transition text-main">
							라이프파트너
						</Link>
					</li>
					<li className="dark:text-white">
						<Link to="/" className="transition hover:font-semibold">
							개인정보 처리방침
						</Link>
					</li>
					<li className="dark:text-white">
						<Link to="/" className="transition hover:font-semibold">
							서비스 이용약관
						</Link>
					</li>
					<li className="dark:text-white">
						<Link to="/" className="transition hover:font-semibold">
							위치기반서비스 이용약관
						</Link>
					</li>
				</ul>
				<span className="inline-block text-gray-400">
					Copyright© 라이프파트너 All rights reserved.
				</span>
			</div>
		</footer>
	);
};

export default Footer;
