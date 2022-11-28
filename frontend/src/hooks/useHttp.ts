import { useCallback } from 'react';
import axios from 'axios';

type request = {
	method?: string | null;
	body?: object | null;
	url: string;
};

const useAuthorizedHttp = () => {
	return useCallback(
		(requestOptions: request) =>
			axios({
				method: requestOptions.method ? requestOptions.method.toLowerCase() : 'get',
				url: 'http://localhost:8080' + requestOptions.url,
				headers: {
					'Content-Type': 'application/json',
				},
				data: requestOptions.body ? JSON.stringify(requestOptions.body) : null,
			}),
		[]
	);
};

export default useAuthorizedHttp;
