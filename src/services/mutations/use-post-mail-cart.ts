import { useMutation } from '@tanstack/react-query';
import { Api } from '../../api/api';
import { CartMailBody } from '../../api/types/api-types';

export function usePostMailCart() {
    return useMutation({
        mutationFn: (body: CartMailBody) => Api.postMailCart(body),
    });
}
