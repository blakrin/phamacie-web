
/**
 * @author Blaise Siani
 */
export class Produit {

    id: number;
    name: string;
    code: string;
    price: DoubleRange;
    datexpiratedDatee: Date;
}

export class Sort {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
}

export class Pageable {
    sort: Sort;
    offset: number;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
    paged: boolean;
}

export class Sort2 {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
}

export class RootObject {
    content: Produit[];
    pageable: Pageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    first: boolean;
    numberOfElements: number;
    sort: Sort2;
    size: number;
    number: number;
    empty: boolean;
}