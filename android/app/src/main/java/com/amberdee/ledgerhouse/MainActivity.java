package com.amberdee.ledgerhouse;
import android.app.Activity;
import android.os.Bundle;
import android.webkit.*;
import androidx.webkit.WebViewAssetLoader;
public class MainActivity extends Activity {
 private WebView web;
 @Override public void onCreate(Bundle state) {
  super.onCreate(state);
  web = new WebView(this); setContentView(web);
  web.getSettings().setJavaScriptEnabled(true);
  web.getSettings().setDomStorageEnabled(true);
  web.getSettings().setAllowFileAccess(false);
  web.getSettings().setAllowContentAccess(false);
  WebViewAssetLoader loader = new WebViewAssetLoader.Builder()
    .addPathHandler("/assets/", new WebViewAssetLoader.AssetsPathHandler(this)).build();
  web.setWebViewClient(new WebViewClient() {
   @Override public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
    WebResourceResponse response = loader.shouldInterceptRequest(request.getUrl());
    return response != null ? response : new WebResourceResponse("text/plain", "UTF-8", new java.io.ByteArrayInputStream(new byte[0]));
   }
   @Override public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) { return true; }
  });
  web.addJavascriptInterface(new Object() {
   @JavascriptInterface public String read() { return LedgerData.read(MainActivity.this); }
   @JavascriptInterface public boolean write(String json) {
    boolean ok = LedgerData.write(MainActivity.this, json);
    if (ok) ExpenseWidget.refresh(MainActivity.this);
    return ok;
   }
  }, "HouseLedger");
  web.loadUrl("https://appassets.androidplatform.net/assets/preview.html");
 }
 @Override public void onResume() { super.onResume(); ExpenseWidget.refresh(this); }
 @Override public void onDestroy() { if(web != null) web.destroy(); super.onDestroy(); }
}

