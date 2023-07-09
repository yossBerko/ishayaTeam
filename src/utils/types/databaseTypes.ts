export type TaskChat = {
    data: string;
    owner: string;
    ownerImage: string;
    time: string;
    type: 'text' | 'image';
};

export type taskContent = {
    id: string | null,
    title: string,
    task?: string,
    location?: string,
    images?: string[],
    date: string,
    deadline: string,
    organsStatus: string,
    workStatus: string,
    client?: string,
    clientImage?: string,
    worker?: string,
    messages?: { [key: string]: TaskChat },
};

export type client = {
    id: string,
    name: string,
    clientTitle: string,
    image: string,
    phone: string
}

export type clients = {
    [key: string]: client
}

export type worker = {
    name: string,
    email?: string,
    image: string,
    phone?: string,
    status?: string,
    password?: string,
    isAdmin?: boolean

}

export type workers = {
    [key: string]: worker
}
