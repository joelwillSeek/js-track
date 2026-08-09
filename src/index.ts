export interface JsTrackOptions {
  baseUrl: string;
  getHeaders?: () => Record<string, string>;
}

export class JsTrack {
  private baseUrl: string;
  private getHeaders?: () => Record<string, string>;

  constructor(options: JsTrackOptions) {
    this.baseUrl = options.baseUrl;
    this.getHeaders = options.getHeaders;
  }

  public async trackEvent(eventName: string, metadata?: Record<string, any>): Promise<void> {
    try {
      const url = `${this.baseUrl}/track-from-platform`;
      const customHeaders = this.getHeaders ? this.getHeaders() : {};
      
      const payload: Record<string, any> = { eventName };
      if (metadata) {
        payload.metadata = metadata;
      }

      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...customHeaders,
        },
        body: JSON.stringify(payload),
      });
    } catch (e) {
      // Analytics failures shouldn't crash the client app
      // e.g. Network offline, backend unreachable
    }
  }
}
