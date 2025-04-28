import { useAppSelector } from "./storeHooks";

export function useCurrentUser() {
  const user = useAppSelector((store) => store.user);
  return user;
}
