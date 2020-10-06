interface PagingResponseParams {
    offset: number;
    limit: number;
    total: number;
}

export class PagingResponse {
    constructor(key: "reminders", value: any[], params: PagingResponseParams) {
        this[key] = {
            items: value,
            limit: params.limit,
            offset: params.offset,
            total: params.total,
        };
    }
}
