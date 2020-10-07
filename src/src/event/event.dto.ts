export default interface Event {
    userId: string;
    userEventId: string;
    itemId: string;
    eventData: { [key: string]: any };
}
