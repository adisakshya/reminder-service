export default interface Event {
    userId: string;
    itemId: string;
    eventData: { [key: string]: any };
}
