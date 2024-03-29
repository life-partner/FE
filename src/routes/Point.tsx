import axios from 'axios';
import Layout, { MyPageLayout } from 'components/Layout';
import Sidebar from 'components/SideBar';
import { addCommasToNumber } from 'functions/common';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { PointHistory } from 'types/types';

const Point = () => {
	const getData = async () => {
		const { data } = await axios({
			method: 'GET',
			url: 'http://15.164.225.61/api/point',
			headers: {
				authorization: `Bearer ${sessionStorage.getItem('token')}`,
			},
		});
		return data;
	};

	const { data } = useQuery(['point'], getData);

	return (
		<Layout noShadow pageTitle="포인트 상세 내역">
			<section className="mypage-layout">
				<Sidebar currentMenu="포인트 상세 내역" />
				{data && (
					<MyPageLayout>
						<h1>포인트 상세 내역</h1>
						<h3 className="point-sub">한 눈에 보기</h3>
						<table className="text-sm md:text-base w-full border-collapse mb-3 md:mb-6">
							<tbody>
								<tr>
									<td className="border-1 text-center">총 포인트</td>
									<td className="border-1 text-center">
										{addCommasToNumber(data.current_point)}
									</td>
								</tr>
								{/* <tr>
									<td className="border-1 text-center">추후 적립 예정</td>
									<td className="border-1 text-center">
										{addCommasToNumber()}
									</td>
								</tr> */}
								<tr>
									<td className="bg-main text-white border-1 text-center font-semibold">
										현재 사용 가능
									</td>
									<td className="bg-main text-white border-1 text-center font-semibold">
										{addCommasToNumber(data.current_point)}
									</td>
								</tr>
							</tbody>
						</table>
						<h3 className="point-sub">세부 내역</h3>
						<table className="text-xs md:text-sm w-full border-collapse mb-3 md:mb-6">
							<thead>
								<tr className="text-center font-medium">
									<td className="border-1 py-1">날짜</td>
									<td className="border-1 py-1">내역</td>
									<td className="border-1 py-1">포인트</td>
								</tr>
							</thead>
							<tbody>
								{data.history?.map((i: PointHistory) => {
									return (
										<tr key={i.id} className="text-center">
											<td className="border-1 py-2 md:py-3">{i.date}</td>
											<td className="border-1 py-2 md:py-3">
												<Link to={`/articles/${i.id}`}>게시글 작성</Link>
											</td>
											<td className="border-1 py-2 md:py-3 pr-3 text-right font-semibold">
												{i.point_earned > 0 ? `+ ` : `- `}
												{addCommasToNumber(Math.abs(i.point_earned))}
											</td>
										</tr>
									);
								})}
								<tr className="text-center">
									<td className="border-1 py-2 md:py-3">
										{data.date || '회원가입'}
									</td>
									<td className="border-1 py-2 md:py-3">회원가입</td>
									<td className="border-1 py-2 md:py-3 pr-3 text-right font-semibold">
										+ {addCommasToNumber(1000)}
									</td>
								</tr>
							</tbody>
						</table>
					</MyPageLayout>
				)}
			</section>
		</Layout>
	);
};

export default Point;
