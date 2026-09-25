package com.amberdee.ledgerhouse;
import android.app.*;
import android.appwidget.*;
import android.content.*;
import android.widget.RemoteViews;
public class ExpenseWidget extends AppWidgetProvider {
 public static void refresh(Context c) {
  AppWidgetManager manager=AppWidgetManager.getInstance(c);
  for(int id:manager.getAppWidgetIds(new ComponentName(c,ExpenseWidget.class))){
   RemoteViews views=new RemoteViews(c.getPackageName(),com.amberdee.ledgerhouse.R.layout.expense_widget);
   views.setTextViewText(com.amberdee.ledgerhouse.R.id.amount,LedgerData.today(c));
   PendingIntent open=PendingIntent.getActivity(c,0,new Intent(c,MainActivity.class),PendingIntent.FLAG_UPDATE_CURRENT|PendingIntent.FLAG_IMMUTABLE);
   views.setOnClickPendingIntent(com.amberdee.ledgerhouse.R.id.widget,open);
   manager.updateAppWidget(id,views);
  }
 }
 @Override public void onUpdate(Context c,AppWidgetManager m,int[] ids){refresh(c);}
 @Override public void onReceive(Context c,Intent intent){super.onReceive(c,intent);refresh(c);}
}

