import { NextFunction, Request, Response } from 'express';

export interface PaginationRequest {
  search?: string;
  page: number;
  pageSize: number;
}

export interface PaginationResponse extends PaginationRequest {
  nextPage: number;
  prevPage: number;
  lastPage: number;
  total: number;
}

export const toPaginationRequest = (req: Request): PaginationRequest => {
  const request: PaginationRequest = {
    page: parseInt(req.query.page as string, 10) || 1,
    pageSize: parseInt(req.query.pageSize as string, 10) || 10,
  };

  if (req.query.search) {
    request.search = req.query.search.toString();
  }

  return request;
};
