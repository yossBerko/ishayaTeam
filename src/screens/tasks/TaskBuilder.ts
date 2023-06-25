export const buildTasks = (data: any) => {
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
