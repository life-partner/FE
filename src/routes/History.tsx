import axios from 'axios';
import BreakDown from 'components/BreakDown';
import Layout, { MyPageLayout } from 'components/Layout';
import Partner from 'components/Partner';
import Sidebar from 'components/SideBar';
import { useEffect, useState } from 'react';
import { Post } from 'types/types';

const History = () => {
	const [list, setList] = useState<Post[]>();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [articleId, setArticleId] = useState<number>();

	const getList = async () => {
		try {
			const authorization = `Bearer ${sessionStorage.getItem('token')}`;
			let nickname: string;
			const response = await axios({
				method: 'GET',
				url: 'http://15.164.225.61/api/users/user-info',
				headers: {
					authorization,
				},
			});
			nickname = response.data.nickname;

			const {
				data: { articles },
			} = await axios({
				method: 'GET',
				url: 'http://15.164.225.61/api/articles',
				headers: {
					authorization,
				},
			});
			setList((prev) => articles.filter((i: Post) => i.writer === nickname));
		} catch (e) {
			console.log(e);
		}
	};

	const selectPartner = (articleId: number) => {
		setIsOpen(true);
		setArticleId((prev) => articleId);
	};

	useEffect(() => {
		getList();
	}, []);

	return (
		<Layout>
			<section className="flex space-x-6">
				<Sidebar currentMenu="나의 이용 내역" />
				<MyPageLayout>
					<h1 className="mb-6">나의 이용 내역</h1>
					{list && (
						<table className="w-full text-sm text-center table-auto">
							<thead className="border-b-1">
								<tr className="font-bold">
									<td>게시글 등록일자</td>
									<td>게시글 제목</td>
									<td>장소</td>
									<td>파트너</td>
									<td>관리</td>
								</tr>
							</thead>
							<tbody>
								{list.length > 0 ? (
									list.map((i) => (
										<BreakDown
											key={i.id}
											item={i}
											selectPartner={selectPartner}
										/>
									))
								) : (
									<tr>
										<td colSpan={6} className="p-2 font-medium">
											내역 없음
										</td>
									</tr>
								)}
							</tbody>
						</table>
					)}
				</MyPageLayout>
			</section>
			{isOpen && (
				<Partner isOpen={isOpen} setIsOpen={setIsOpen} articleId={articleId} />
			)}
		</Layout>
	);
};

export default History;
