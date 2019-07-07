interface course_type {
    cname: string,
    ename: string,
    code: number,
    id: number,
    startdate: number,
    enddate: number
}
interface course_list {
    [semester: number]: Array<course_type>
}
interface attach_type {
    name: string,
    type: string,
    size: number,
    timemodified: Date,
    url: string,
}
interface ann_type {
    title: string,
    content: string,
    isRead: boolean,
    timeCreated: Date,
    timeModified: Date,
    attach: Array<attach_type>,
    pinned: boolean,
}
interface ann_list {
    ['news']: {
        form_id: number,
        ann: Array<ann_type>
    },
    ['general']: {
        form_id: number,
        ann: Array<ann_type>
    },
}