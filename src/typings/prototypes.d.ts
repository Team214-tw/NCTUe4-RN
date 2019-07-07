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
interface ann {
    title: string,
    
}