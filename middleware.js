import { NextResponse } from 'next/server';

export function middleware(request) {
  const host = request.headers.get('host');
  const url = request.nextUrl.clone();

  // 1. 如果來源是您的自訂網域 (請替換為您的實際網域)
  const customDomain = 'www.lifegardenforchildren.com'; 
  
  // 2. 如果來源包含 'vercel.app'，則是預覽/測試環境
  const isVercelDomain = host.includes('vercel.app');

  // 邏輯：如果是自訂網域且目前不是在維護頁面，就導向 maintenance.html
  if (host === customDomain && url.pathname !== '/maintenance.html') {
    url.pathname = '/maintenance.html';
    return NextResponse.rewrite(url);
  }

  // 否則放行 (如果是 vercel.app，會直接顯示 index.html)
  return NextResponse.next();
}

// 設定只攔截根目錄或首頁請求
export const config = {
  matcher: '/',
};