export default function converction(time: string) {
    const Time = time.split(':').map(Number)

    const [hour, minute] = Time

    const TimeInMinutes = (hour * 60) + minute;

    return TimeInMinutes
}