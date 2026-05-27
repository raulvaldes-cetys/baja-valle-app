import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../query-keys';
import { Api } from '../../api/api';

export function useGetProductsList() {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_ALL_PRODUCTS],
        queryFn: async () => {
            return Api.getProductsList();
        }
    });
}