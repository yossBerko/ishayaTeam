export const buildTasks = (data: any) => {
    if(data === null) return null;
    return {
        id: data.id,
        title: `${data.title}`,
        task: `${data.task}`,
        location: `${data.location}`,
        date: `${data.date}`,
        deadline: `${data.deadline}`,
        organsStatus: `${data.organsStatus}`,
        workStatus: `${data.workStatus}`,
        client: `${data.client}`,
        clientImage: `${data.clientImage}`,
        worker: `${data.worker}`,
    };
}
