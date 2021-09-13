import { Dispatch, SetStateAction } from "react";

export type UseState<T> = [state: T, setState: Dispatch<SetStateAction<T>>];
