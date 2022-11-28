import { useCallback } from 'react';
import axios from 'axios';
import { IStoreState } from '../store/store';
import { useSelector } from 'react-redux';

type request = {
	method?: string | null;
	body?: object | null;
	url: string;
	token?: string;
};

const useAuthorizedHttp = () => {
	const token = useSelector((state: IStoreState) => state.app.token);
	
	return useCallback(
		(requestOptions: request) =>
			axios({
				method: requestOptions.method ? requestOptions.method.toLowerCase() : 'get',
				url: 'http://localhost:8080' + requestOptions.url,
				headers: {
					Authorization: `Bearer ${requestOptions.token ? requestOptions.token : token}`,
					'Content-Type': `${requestOptions.body ? 'application/json' : ''}`,
				},
				data: requestOptions.body ? JSON.stringify(requestOptions.body) : null,
			}),
		[token]
	);
};

export default useAuthorizedHttp;
