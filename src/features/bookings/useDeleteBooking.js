import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: (id) => deleteBookingApi(id),
    // onSuccess callback helps invalidating the cache as soon as a mutation happens, the way to do that is by getting the queryClient which we get access to through useQueryClient custom hook and then call the invalidateQueries method on it.
    onSuccess: () => {
      toast.success(`Booking successfully deleted`);
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    // besides the onSuccess handler we also have an onError handler, which gets access to the error thrown in the original function
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteBooking };
}
