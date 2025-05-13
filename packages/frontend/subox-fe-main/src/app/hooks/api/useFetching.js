
import { useEffect } from "react";
import { useDispatch } from 'react-redux'

export const useFetching = (someFetchActionCreator) => {
    const dispatch = useDispatch()
    useEffect(() => {
    dispatch(someFetchActionCreator);
  }, [dispatch, someFetchActionCreator])
}