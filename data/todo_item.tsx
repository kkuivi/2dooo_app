class TodoItem {
    public title: string;
    public id: bigint | null;
    public done: boolean | null;
    public created_at: Date | null;

    constructor(title: string, id: bigint, done: boolean, created_at: Date) {
        this.title = title;
        this.id = id;
        this.done = done;
        this.created_at = created_at;
    }
}

export default TodoItem;
