import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../query-keys';
import { Api } from '../../api/api';

export function useGetProductById(id: string) {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_ALL_PRODUCTS, id],
        queryFn: () => Api.getProductDetails(id),
        enabled: !!id,
    });
}
