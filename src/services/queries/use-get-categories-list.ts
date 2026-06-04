import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../query-keys';
import { Api } from '../../api/api';
import { CategoriesListResponse } from '../../api/types/api-types';

export function useGetCategoriesList() {
    return useQuery<CategoriesListResponse>({
        queryKey: [QUERY_KEYS.GET_ALL_CATEGORIES],
        queryFn: async () => {
            return Api.getCategoriesList();
        }
    });
}
