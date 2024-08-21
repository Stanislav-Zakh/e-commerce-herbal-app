import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpXsrfTokenExtractor } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {
  constructor(private tokenExtractor: HttpXsrfTokenExtractor) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const csrfToken = this.tokenExtractor.getToken() as string;
    if (csrfToken !== null && !req.headers.has('X-XSRF-TOKEN')) {
      req = req.clone({
        headers: req.headers.set('X-XSRF-TOKEN', csrfToken),
        withCredentials: true // This ensures cookies are sent with the request
      });
    }
    return next.handle(req);
  }
}
