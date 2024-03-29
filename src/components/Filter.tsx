import { MouseEvent, useState, Dispatch, FormEvent } from 'react';
import { ReactComponent as ChevronDownSVG } from 'static/icons/chevron-down.svg';
import { addCommasToNumber } from 'functions/common';
import classNames from 'classnames';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { ActionChangeRange } from 'types/types';
import LocationFilter from './LocationFilter';

const Filter = (props: {
	price: number[];
	period: number[];
	state: { minPrice: number; maxPeriod: number; location: string[] };
	dispatch: Dispatch<ActionChangeRange>;
	getPosts: () => void;
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [openedFilter, setOpenedFilter] = useState<string>('');

	const changeRange = (data: number | number[]) => {
		if (!Array.isArray(data)) {
			props.dispatch({
				type: openedFilter === 'price' ? 'CHANGE_PRICE' : 'CHANGE_PERIOD',
				value: data,
			});
		}
	};

	const openFilter = (e: MouseEvent<HTMLButtonElement>) => {
		const target = e.currentTarget.getAttribute('name');
		if (target === null) {
			return;
		} else {
			if (isOpen) {
				// 메뉴가 뭐라도 열려있을 때
				if (openedFilter === target) {
					// 열려있는 메뉴 선택하면 열려져 있던 메뉴 닫기
					setIsOpen((prev) => !prev);
					setOpenedFilter((prev) => '');
				} else {
					// 열려있지 않은 다른 메뉴 선택하면 해당 메뉴 열기
					setOpenedFilter((prev) => target);
				}
			} else {
				// 메뉴 닫혀있을 때 선택한 메뉴 열기
				setIsOpen((prev) => !prev);
				setOpenedFilter((prev) => target);
			}
		}
	};

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		props.getPosts();
	};

	const resetRange = (e: MouseEvent<HTMLButtonElement>) => {
		const target = e.currentTarget.getAttribute('name');
		if (target === 'price') {
			props.dispatch({ type: 'CHANGE_PRICE', value: 2000 });
		} else if (target === 'period') {
			props.dispatch({ type: 'CHANGE_PERIOD', value: 120 });
		}
	};

	const closeFilter = () => {
		setIsOpen((prev) => !prev);
		setOpenedFilter((prev) => '');
	};

	return (
		<ul className="flex mb-3 space-x-3 sticky top-[64px] py-3 bg-white z-[5] border-b-1 dark:bg-dark dark:border-b-dark dark:text-dark">
			<li className="relative">
				<button
					type="button"
					name="location"
					className={classNames('btn-filter center transition', {
						'bg-main text-white font-semibold': openedFilter === 'location',
					})}
					onClick={openFilter}
				>
					<span className="mr-1 text-sm">위치</span>
					<ChevronDownSVG
						className={classNames('transition h-5 w-5', {
							'rotate-180': openedFilter === 'location',
						})}
					/>
				</button>
				<form
					className={classNames('filter-form w-64 p-3 space-y-3 sm:w-80', {
						'opacity-100 visible': isOpen && openedFilter === 'location',
						'opacity-0 invisible': !isOpen || openedFilter !== 'location',
					})}
				>
					<LocationFilter
						closeFilter={closeFilter}
						dispatch={props.dispatch}
						getPosts={props.getPosts}
					/>
				</form>
			</li>
			<li className="relative">
				<button
					name="price"
					type="button"
					className={classNames('btn-filter center transition', {
						'bg-main text-white font-semibold': openedFilter === 'price',
					})}
					onClick={openFilter}
				>
					<span className="mr-1 text-sm">금액</span>
					<ChevronDownSVG
						className={classNames('transition h-5 w-5', {
							'rotate-180': openedFilter === 'price',
						})}
					/>
				</button>
				<form
					name="price"
					className={classNames('filter-form -left-[5.5rem]', {
						'opacity-100 visible': isOpen && openedFilter === 'price',
						'opacity-0 invisible': !isOpen || openedFilter !== 'price',
					})}
					onSubmit={onSubmit}
				>
					<fieldset className="w-full text-center space-y-3">
						<legend className="text-sm inline-block">
							{`최저 ${addCommasToNumber(props.state.minPrice)}원부터`}
						</legend>
						<Slider
							// range
							min={2000}
							max={30000}
							step={1000}
							value={props.state.minPrice}
							defaultValue={props.price[0]}
							allowCross={true}
							onChange={changeRange}
						/>
					</fieldset>
					<div className="flex justify-center space-x-6">
						<button
							name="price"
							type="button"
							className="btn-secondary text-sm"
							onClick={resetRange}
						>
							초기화
						</button>
						<button
							name="price"
							type="submit"
							className="btn-primary text-sm"
							onClick={closeFilter}
						>
							적용
						</button>
					</div>
				</form>
			</li>
			<li className="relative">
				<button
					name="period"
					type="button"
					className={classNames('btn-filter center transition', {
						'bg-main text-white font-semibold': openedFilter === 'period',
					})}
					onClick={openFilter}
				>
					<span className="mr-1 text-sm">소요 시간</span>
					<ChevronDownSVG
						className={classNames('transition h-5 w-5', {
							'rotate-180': openedFilter === 'period',
						})}
					/>
				</button>
				<form
					name="period"
					className={classNames('filter-form -left-[11rem]', {
						'opacity-100 visible': isOpen && openedFilter === 'period',
						'opacity-0 invisible': !isOpen || openedFilter !== 'period',
					})}
					onSubmit={onSubmit}
				>
					<fieldset className="w-full text-center space-y-2">
						<legend className="text-sm inline-block">
							{`최장 ${props.state.maxPeriod}분 소요`}
						</legend>
						<Slider
							// range
							min={10}
							max={120}
							step={10}
							value={props.state.maxPeriod}
							defaultValue={props.period[1]}
							allowCross={true}
							onChange={changeRange}
						/>
					</fieldset>
					<div className="flex justify-center space-x-6">
						<button
							type="button"
							name="period"
							className="btn-secondary text-sm"
							onClick={resetRange}
						>
							초기화
						</button>
						<button
							name="period"
							type="submit"
							className="btn-primary text-sm"
							onClick={closeFilter}
						>
							적용
						</button>
					</div>
				</form>
			</li>
		</ul>
	);
};

export default Filter;
