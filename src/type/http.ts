import { NextResponse } from 'next/server';

type CommonResponse<T> = NextResponse<
  T & {
    message: string;
    success: boolean;
  }
>;
type ApendToSuccess<T> = T extends undefined ? {} : { data?: T };
type ApendToError<E> = E extends undefined ? {} : { error?: E };

type ApiResponse<T, E = unknown> = CommonResponse<ApendToSuccess<T>> | CommonResponse<ApendToError<E>>;

export type { ApiResponse };
