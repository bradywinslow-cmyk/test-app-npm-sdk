export type Booking = {
  id: string;
  userId: string;
  service: "Walk" | "Drop-in" | "Overnight";
  date: string;
  time: string;
  durationMins: number;
  pets: number;
  notes?: string;
  createdAt: string;
};

const BOOKINGS_KEY = "dw_bookings";

export const bookingService = {
  read: (): Booking[] => JSON.parse(localStorage.getItem(BOOKINGS_KEY) || "[]"),
  
  create: (data: Omit<Booking, "id" | "createdAt">): Booking => {
    const booking = { ...data, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
    const all = bookingService.read();
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify([...all, booking]));
    return booking;
  },

  listByUser: (userId: string) => bookingService.read().filter(b => b.userId === userId)
};
