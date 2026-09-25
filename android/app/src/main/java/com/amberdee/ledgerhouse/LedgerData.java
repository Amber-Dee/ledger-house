package com.amberdee.ledgerhouse;
import android.content.Context;
import org.json.*;
import java.math.BigDecimal;
import java.time.LocalDate;
public final class LedgerData {
 public static synchronized String read(Context c) { return c.getSharedPreferences("ledger",0).getString("bills","[]"); }
 public static synchronized boolean write(Context c, String json) {
  try {
   JSONArray rows = new JSONArray(json);
   for(int i=0;i<rows.length();i++){
    JSONObject row=rows.getJSONObject(i);
    String type=row.getString("type");
    if(!type.equals("income")&&!type.equals("expense")) return false;
    LocalDate.parse(row.getString("date"));
    long cents=new BigDecimal(row.get("amount").toString()).movePointRight(2).longValueExact();
    if(cents<=0 || cents>9999999900L) return false;
   }
   return c.getSharedPreferences("ledger",0).edit().putString("bills",rows.toString()).commit();
  } catch(Exception e){return false;}
 }
 public static String today(Context c) {
  try {
   JSONArray rows=new JSONArray(read(c)); long cents=0; String day=LocalDate.now().toString();
   for(int i=0;i<rows.length();i++){
    JSONObject row=rows.getJSONObject(i);
    if(day.equals(row.getString("date"))&&"expense".equals(row.getString("type")))
     cents=Math.addExact(cents,new BigDecimal(row.get("amount").toString()).movePointRight(2).longValueExact());
   }
   return "¥"+BigDecimal.valueOf(cents,2).toPlainString();
  }catch(Exception e){return "请打开账本检查";}
 }
}

