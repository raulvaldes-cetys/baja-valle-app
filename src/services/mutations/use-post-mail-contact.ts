import { useMutation } from '@tanstack/react-query';
import { Api } from '../../api/api';
import { ContactMailBody } from '../../api/types/api-types';

export function usePostMailContact() {
    return useMutation({
        mutationFn: (body: ContactMailBody) => Api.postMailContact(body),
    });
}
