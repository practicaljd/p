window.SLIP_OVERRIDES = {
  "4-Q2A": `MainActivity.java:
import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    EditText etName = findViewById(R.id.etName);
    EditText etSurname = findViewById(R.id.etSurname);
    EditText etClass = findViewById(R.id.etClass);
    EditText etMarks = findViewById(R.id.etMarks);
    RadioGroup rgGender = findViewById(R.id.rgGender);
    CheckBox cbReading = findViewById(R.id.cbReading);
    CheckBox cbSports = findViewById(R.id.cbSports);
    Button btnSubmit = findViewById(R.id.btnSubmit);

    btnSubmit.setOnClickListener(v -> {
      int selectedId = rgGender.getCheckedRadioButtonId();
      RadioButton selected = findViewById(selectedId);
      String gender = selected == null ? "" : selected.getText().toString();
      StringBuilder hobbies = new StringBuilder();
      if (cbReading.isChecked()) {
        hobbies.append("Reading ");
      }
      if (cbSports.isChecked()) {
        hobbies.append("Sports ");
      }
      Intent intent = new Intent(this, DetailActivity.class);
      intent.putExtra("name", etName.getText().toString());
      intent.putExtra("surname", etSurname.getText().toString());
      intent.putExtra("className", etClass.getText().toString());
      intent.putExtra("gender", gender);
      intent.putExtra("hobbies", hobbies.toString().trim());
      intent.putExtra("marks", etMarks.getText().toString());
      startActivity(intent);
    });
  }
}

DetailActivity.java:
import android.os.Bundle;
import android.widget.TableLayout;
import android.widget.TableRow;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class DetailActivity extends AppCompatActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_detail);

    String[][] data = {
      {"Name", getIntent().getStringExtra("name")},
      {"Surname", getIntent().getStringExtra("surname")},
      {"Class", getIntent().getStringExtra("className")},
      {"Gender", getIntent().getStringExtra("gender")},
      {"Hobbies", getIntent().getStringExtra("hobbies")},
      {"Marks", getIntent().getStringExtra("marks")}
    };

    TableLayout tableLayout = findViewById(R.id.tableLayout);
    for (String[] row : data) {
      TableRow tableRow = new TableRow(this);
      TextView key = new TextView(this);
      TextView value = new TextView(this);
      key.setText(row[0]);
      value.setText(row[1]);
      key.setPadding(24, 16, 24, 16);
      value.setPadding(24, 16, 24, 16);
      tableRow.addView(key);
      tableRow.addView(value);
      tableLayout.addView(tableRow);
    }
  }
}

activity_main.xml:
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="16dp">

    <EditText
        android:id="@+id/etName"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Name" />

    <EditText
        android:id="@+id/etSurname"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Surname" />

    <EditText
        android:id="@+id/etClass"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Class" />

    <RadioGroup
        android:id="@+id/rgGender"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:orientation="horizontal">

        <RadioButton
            android:id="@+id/rbMale"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Male" />

        <RadioButton
            android:id="@+id/rbFemale"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Female" />
    </RadioGroup>

    <CheckBox
        android:id="@+id/cbReading"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Reading" />

    <CheckBox
        android:id="@+id/cbSports"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Sports" />

    <EditText
        android:id="@+id/etMarks"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Marks"
        android:inputType="numberDecimal" />

    <Button
        android:id="@+id/btnSubmit"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Show Details" />
</LinearLayout>

activity_detail.xml:
<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TableLayout
        android:id="@+id/tableLayout"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:padding="16dp"
        android:stretchColumns="1" />
</ScrollView>`,

  "4-Q2B": `AndroidManifest.xml:
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.mapsdemo">

    <application>
        <meta-data
            android:name="com.google.android.geo.API_KEY"
            android:value="YOUR_KEY" />
    </application>
</manifest>

MapsActivity.java:
import android.os.Bundle;
import androidx.fragment.app.FragmentActivity;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;

public class MapsActivity extends FragmentActivity implements OnMapReadyCallback {
  private GoogleMap gMap;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_maps);
    SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager().findFragmentById(R.id.map);
    if (mapFragment != null) {
      mapFragment.getMapAsync(this);
    }
  }

  @Override
  public void onMapReady(GoogleMap googleMap) {
    gMap = googleMap;
    gMap.setMapType(GoogleMap.MAP_TYPE_SATELLITE);
    LatLng pune = new LatLng(18.5204, 73.8567);
    gMap.addMarker(new MarkerOptions().position(pune).title("Current Location"));
    gMap.moveCamera(CameraUpdateFactory.newLatLngZoom(pune, 12f));
  }
}

activity_maps.xml:
<fragment xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/map"
    android:name="com.google.android.gms.maps.SupportMapFragment"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />`,

  "7-Q2A": `MainActivity.java:
import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    EditText etFirst = findViewById(R.id.etFirst);
    EditText etSecond = findViewById(R.id.etSecond);
    Button btnCalculate = findViewById(R.id.btnCalculate);

    btnCalculate.setOnClickListener(v -> {
      double n1 = Double.parseDouble(etFirst.getText().toString());
      double n2 = Double.parseDouble(etSecond.getText().toString());
      double power = Math.pow(n1, n2);
      double average = (n1 + n2) / 2.0;
      Intent intent = new Intent(this, ResultActivity.class);
      intent.putExtra("n1", n1);
      intent.putExtra("n2", n2);
      intent.putExtra("power", power);
      intent.putExtra("avg", average);
      startActivity(intent);
    });
  }
}

ResultActivity.java:
import android.os.Bundle;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class ResultActivity extends AppCompatActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_result);

    double n1 = getIntent().getDoubleExtra("n1", 0);
    double n2 = getIntent().getDoubleExtra("n2", 0);
    double power = getIntent().getDoubleExtra("power", 0);
    double avg = getIntent().getDoubleExtra("avg", 0);

    TextView tvResult = findViewById(R.id.tvResult);
    tvResult.setText("Power (" + n1 + "^" + n2 + ") = " + power + "\\nAverage = " + avg);
  }
}

activity_main.xml:
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="16dp">

    <EditText
        android:id="@+id/etFirst"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="First Number"
        android:inputType="numberDecimal" />

    <EditText
        android:id="@+id/etSecond"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Second Number"
        android:inputType="numberDecimal" />

    <Button
        android:id="@+id/btnCalculate"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Calculate" />
</LinearLayout>

activity_result.xml:
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:padding="16dp">

    <TextView
        android:id="@+id/tvResult"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:textSize="20sp" />
</LinearLayout>`,

  "7-Q2B": `DBHelper.java:
import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public class DBHelper extends SQLiteOpenHelper {
  public DBHelper(Context context) {
    super(context, "CustomerDB", null, 1);
  }

  @Override
  public void onCreate(SQLiteDatabase db) {
    db.execSQL("CREATE TABLE Customer(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,address TEXT,phno TEXT)");
  }

  @Override
  public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
    db.execSQL("DROP TABLE IF EXISTS Customer");
    onCreate(db);
  }

  public long insertCustomer(String name, String address, String phone) {
    ContentValues values = new ContentValues();
    values.put("name", name);
    values.put("address", address);
    values.put("phno", phone);
    return getWritableDatabase().insert("Customer", null, values);
  }

  public Cursor getAllCustomers() {
    return getReadableDatabase().rawQuery("SELECT * FROM Customer", null);
  }
}

MainActivity.java:
import android.database.Cursor;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    DBHelper dbHelper = new DBHelper(this);
    EditText etName = findViewById(R.id.etName);
    EditText etAddress = findViewById(R.id.etAddress);
    EditText etPhone = findViewById(R.id.etPhone);
    Button btnInsert = findViewById(R.id.btnInsert);
    Button btnShow = findViewById(R.id.btnShow);

    btnInsert.setOnClickListener(v -> {
      dbHelper.insertCustomer(
        etName.getText().toString(),
        etAddress.getText().toString(),
        etPhone.getText().toString()
      );
      Toast.makeText(this, "Customer Added", Toast.LENGTH_SHORT).show();
    });

    btnShow.setOnClickListener(v -> {
      Cursor cursor = dbHelper.getAllCustomers();
      StringBuilder builder = new StringBuilder();
      while (cursor.moveToNext()) {
        builder.append(cursor.getInt(0)).append(" | ")
          .append(cursor.getString(1)).append(" | ")
          .append(cursor.getString(2)).append(" | ")
          .append(cursor.getString(3)).append("\\n");
      }
      Toast.makeText(this, builder.toString(), Toast.LENGTH_LONG).show();
    });
  }
}

activity_main.xml:
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="16dp">

    <EditText
        android:id="@+id/etName"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Customer Name" />

    <EditText
        android:id="@+id/etAddress"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Address" />

    <EditText
        android:id="@+id/etPhone"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Phone"
        android:inputType="phone" />

    <Button
        android:id="@+id/btnInsert"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Insert" />

    <Button
        android:id="@+id/btnShow"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Show All" />
</LinearLayout>`,

  "9-Q2A": `activity_main.xml:
<TableLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:padding="16dp">

    <TableRow>
        <TextView android:text="First Name" />
        <EditText android:id="@+id/etFirst" android:layout_width="match_parent" android:layout_height="wrap_content" />
    </TableRow>

    <TableRow>
        <TextView android:text="Last Name" />
        <EditText android:id="@+id/etLast" android:layout_width="match_parent" android:layout_height="wrap_content" />
    </TableRow>

    <TableRow>
        <TextView android:text="Address" />
        <EditText android:id="@+id/etAddress" android:layout_width="match_parent" android:layout_height="wrap_content" />
    </TableRow>

    <TableRow>
        <TextView android:text="Phone" />
        <EditText android:id="@+id/etPhone" android:layout_width="match_parent" android:layout_height="wrap_content" android:inputType="phone" />
    </TableRow>

    <TableRow>
        <TextView android:text="Email" />
        <EditText android:id="@+id/etEmail" android:layout_width="match_parent" android:layout_height="wrap_content" android:inputType="textEmailAddress" />
    </TableRow>

    <TableRow>
        <RadioGroup android:id="@+id/rgGender" android:layout_width="wrap_content" android:layout_height="wrap_content" android:orientation="horizontal">
            <RadioButton android:id="@+id/rbMale" android:layout_width="wrap_content" android:layout_height="wrap_content" android:text="Male" />
            <RadioButton android:id="@+id/rbFemale" android:layout_width="wrap_content" android:layout_height="wrap_content" android:text="Female" />
        </RadioGroup>
    </TableRow>

    <TableRow>
        <Button android:id="@+id/btnSubmit" android:layout_width="wrap_content" android:layout_height="wrap_content" android:text="Submit" />
        <Button android:id="@+id/btnClear" android:layout_width="wrap_content" android:layout_height="wrap_content" android:text="Clear" />
    </TableRow>
</TableLayout>

MainActivity.java:
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    EditText etFirst = findViewById(R.id.etFirst);
    EditText etLast = findViewById(R.id.etLast);
    EditText etAddress = findViewById(R.id.etAddress);
    EditText etPhone = findViewById(R.id.etPhone);
    EditText etEmail = findViewById(R.id.etEmail);
    RadioGroup rgGender = findViewById(R.id.rgGender);
    Button btnSubmit = findViewById(R.id.btnSubmit);
    Button btnClear = findViewById(R.id.btnClear);

    btnSubmit.setOnClickListener(v -> {
      RadioButton selected = findViewById(rgGender.getCheckedRadioButtonId());
      String gender = selected == null ? "" : selected.getText().toString();
      String message = "Name: " + etFirst.getText().toString() + " " + etLast.getText().toString()
        + "\\nAddress: " + etAddress.getText().toString()
        + "\\nPhone: " + etPhone.getText().toString()
        + "\\nEmail: " + etEmail.getText().toString()
        + "\\nGender: " + gender;
      Toast.makeText(this, message, Toast.LENGTH_LONG).show();
    });

    btnClear.setOnClickListener(v -> {
      etFirst.setText("");
      etLast.setText("");
      etAddress.setText("");
      etPhone.setText("");
      etEmail.setText("");
      rgGender.clearCheck();
    });
  }
}`,

  "9-Q2B": `AndroidManifest.xml:
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-permission android:name="android.permission.SEND_SMS" />
</manifest>

activity_main.xml:
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="16dp">

    <EditText
        android:id="@+id/etPhone"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Phone Number"
        android:inputType="phone" />

    <EditText
        android:id="@+id/etMessage"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Message" />

    <Button
        android:id="@+id/btnSend"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Send SMS" />

    <TextView
        android:id="@+id/tvStatus"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Status" />
</LinearLayout>

MainActivity.java:
import android.Manifest;
import android.app.Activity;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.telephony.SmsManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;

public class MainActivity extends AppCompatActivity {
  private EditText etPhone;
  private EditText etMessage;
  private TextView tvStatus;
  private final BroadcastReceiver deliveryReceiver = new BroadcastReceiver() {
    @Override
    public void onReceive(Context context, Intent intent) {
      tvStatus.setText(getResultCode() == Activity.RESULT_OK ? "Delivered" : "Not Delivered");
    }
  };
  private final ActivityResultLauncher<String> permissionLauncher =
    registerForActivityResult(new ActivityResultContracts.RequestPermission(), granted -> {
      if (granted) {
        sendSms();
      } else {
        tvStatus.setText("Permission Denied");
      }
    });

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    etPhone = findViewById(R.id.etPhone);
    etMessage = findViewById(R.id.etMessage);
    tvStatus = findViewById(R.id.tvStatus);
    Button btnSend = findViewById(R.id.btnSend);

    registerReceiver(deliveryReceiver, new IntentFilter("SMS_DELIVERED"));

    btnSend.setOnClickListener(v -> {
      if (ContextCompat.checkSelfPermission(this, Manifest.permission.SEND_SMS) == PackageManager.PERMISSION_GRANTED) {
        sendSms();
      } else {
        permissionLauncher.launch(Manifest.permission.SEND_SMS);
      }
    });
  }

  private void sendSms() {
    String phone = etPhone.getText().toString();
    String message = etMessage.getText().toString();
    Intent deliveredIntent = new Intent("SMS_DELIVERED");
    PendingIntent deliveredPendingIntent = PendingIntent.getBroadcast(this, 0, deliveredIntent, PendingIntent.FLAG_IMMUTABLE);
    SmsManager.getDefault().sendTextMessage(phone, null, message, null, deliveredPendingIntent);
    tvStatus.setText("Sent");
  }

  @Override
  protected void onDestroy() {
    super.onDestroy();
    unregisterReceiver(deliveryReceiver);
  }
}`,

  "10-Q2A": `AndroidManifest.xml:
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.mapszoom">

    <application>
        <meta-data
            android:name="com.google.android.geo.API_KEY"
            android:value="YOUR_KEY" />
    </application>
</manifest>

activity_maps.xml:
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:gravity="center"
        android:orientation="horizontal"
        android:padding="8dp">

        <Button
            android:id="@+id/btnZoomIn"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Zoom In" />

        <Button
            android:id="@+id/btnZoomOut"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Zoom Out" />
    </LinearLayout>

    <fragment
        android:id="@+id/map"
        android:name="com.google.android.gms.maps.SupportMapFragment"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />
</LinearLayout>

MapsActivity.java:
import android.os.Bundle;
import android.widget.Button;
import androidx.fragment.app.FragmentActivity;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;

public class MapsActivity extends FragmentActivity implements OnMapReadyCallback {
  private GoogleMap gMap;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_maps);

    Button btnZoomIn = findViewById(R.id.btnZoomIn);
    Button btnZoomOut = findViewById(R.id.btnZoomOut);
    SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager().findFragmentById(R.id.map);
    if (mapFragment != null) {
      mapFragment.getMapAsync(this);
    }

    btnZoomIn.setOnClickListener(v -> {
      if (gMap != null) {
        gMap.animateCamera(CameraUpdateFactory.zoomIn());
      }
    });

    btnZoomOut.setOnClickListener(v -> {
      if (gMap != null) {
        gMap.animateCamera(CameraUpdateFactory.zoomOut());
      }
    });
  }

  @Override
  public void onMapReady(GoogleMap googleMap) {
    gMap = googleMap;
    gMap.setMapType(GoogleMap.MAP_TYPE_SATELLITE);
    LatLng pune = new LatLng(18.5204, 73.8567);
    gMap.addMarker(new MarkerOptions().position(pune).title("Pune"));
    gMap.moveCamera(CameraUpdateFactory.newLatLngZoom(pune, 12f));
  }
}`,

  "10-Q2B": `DBHelper.java:
import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public class DBHelper extends SQLiteOpenHelper {
  public DBHelper(Context context) {
    super(context, "GameDB", null, 1);
  }

  @Override
  public void onCreate(SQLiteDatabase db) {
    db.execSQL("CREATE TABLE Game(gno INTEGER PRIMARY KEY AUTOINCREMENT,gname TEXT,type TEXT,no_of_players INTEGER)");
    db.execSQL("INSERT INTO Game(gname,type,no_of_players) VALUES('Cricket','Outdoor',11)");
    db.execSQL("INSERT INTO Game(gname,type,no_of_players) VALUES('Badminton','Outdoor',2)");
  }

  @Override
  public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
    db.execSQL("DROP TABLE IF EXISTS Game");
    onCreate(db);
  }

  public void updateBadminton() {
    ContentValues values = new ContentValues();
    values.put("no_of_players", 4);
    getWritableDatabase().update("Game", values, "gname=?", new String[]{"Badminton"});
  }

  public Cursor getAllGames() {
    return getReadableDatabase().rawQuery("SELECT * FROM Game", null);
  }
}

MainActivity.java:
import android.database.Cursor;
import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    DBHelper dbHelper = new DBHelper(this);
    Button btnUpdate = findViewById(R.id.btnUpdate);
    Button btnShow = findViewById(R.id.btnShow);
    TextView tvResult = findViewById(R.id.tvResult);

    btnUpdate.setOnClickListener(v -> {
      dbHelper.updateBadminton();
      tvResult.setText("Updated Badminton Players to 4");
    });

    btnShow.setOnClickListener(v -> {
      Cursor cursor = dbHelper.getAllGames();
      StringBuilder builder = new StringBuilder();
      while (cursor.moveToNext()) {
        builder.append(cursor.getInt(0)).append(" | ")
          .append(cursor.getString(1)).append(" | ")
          .append(cursor.getString(2)).append(" | ")
          .append(cursor.getInt(3)).append("\\n");
      }
      tvResult.setText(builder.toString());
    });
  }
}

activity_main.xml:
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="16dp">

    <Button
        android:id="@+id/btnUpdate"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Update Badminton" />

    <Button
        android:id="@+id/btnShow"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Show All Games" />

    <TextView
        android:id="@+id/tvResult"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:paddingTop="16dp" />
</LinearLayout>`,

  "11-Q2A": `activity_main.xml:
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:orientation="vertical"
    android:padding="16dp">

    <RadioGroup
        android:id="@+id/rgGender"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:orientation="horizontal">

        <RadioButton
            android:id="@+id/rbMale"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Male" />

        <RadioButton
            android:id="@+id/rbFemale"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Female" />
    </RadioGroup>

    <Button
        android:id="@+id/btnShow"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Show Selection" />
</LinearLayout>

MainActivity.java:
import android.os.Bundle;
import android.widget.Button;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    RadioGroup rgGender = findViewById(R.id.rgGender);
    Button btnShow = findViewById(R.id.btnShow);

    btnShow.setOnClickListener(v -> {
      RadioButton selected = findViewById(rgGender.getCheckedRadioButtonId());
      String text = selected == null ? "Nothing Selected" : selected.getText().toString();
      Toast.makeText(this, text, Toast.LENGTH_SHORT).show();
    });
  }
}`,

  "11-Q2B": `activity_main.xml:
<ListView xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/lvNames"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />

MainActivity.java:
import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    String[] names = {"Satish", "Rakesh", "Rajesh", "Suresh", "Dinesh", "Kamlesh"};
    ListView listView = findViewById(R.id.lvNames);
    listView.setAdapter(new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, names));
    listView.setOnItemClickListener((parent, view, position, id) ->
      Toast.makeText(this, names[position], Toast.LENGTH_SHORT).show()
    );
  }
}`,

  "12-Q2A": `activity_main.xml:
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="16dp">

    <RadioGroup
        android:id="@+id/rgClass"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content">

        <RadioButton android:id="@+id/rbFY" android:layout_width="wrap_content" android:layout_height="wrap_content" android:text="FYBBA CA" />
        <RadioButton android:id="@+id/rbSY" android:layout_width="wrap_content" android:layout_height="wrap_content" android:text="SYBBA CA" />
        <RadioButton android:id="@+id/rbTY" android:layout_width="wrap_content" android:layout_height="wrap_content" android:text="TYBBA CA" />
    </RadioGroup>

    <CheckBox android:id="@+id/cbJava" android:layout_width="wrap_content" android:layout_height="wrap_content" android:text="Java" />
    <CheckBox android:id="@+id/cbAndroid" android:layout_width="wrap_content" android:layout_height="wrap_content" android:text="Android" />
    <CheckBox android:id="@+id/cbPython" android:layout_width="wrap_content" android:layout_height="wrap_content" android:text="Python" />

    <Button android:id="@+id/btnShow" android:layout_width="wrap_content" android:layout_height="wrap_content" android:text="Show" />
</LinearLayout>

MainActivity.java:
import android.os.Bundle;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    RadioGroup rgClass = findViewById(R.id.rgClass);
    CheckBox cbJava = findViewById(R.id.cbJava);
    CheckBox cbAndroid = findViewById(R.id.cbAndroid);
    CheckBox cbPython = findViewById(R.id.cbPython);
    Button btnShow = findViewById(R.id.btnShow);

    btnShow.setOnClickListener(v -> {
      RadioButton selected = findViewById(rgClass.getCheckedRadioButtonId());
      String className = selected == null ? "" : selected.getText().toString();
      StringBuilder subjects = new StringBuilder();
      if (cbJava.isChecked()) {
        subjects.append("Java ");
      }
      if (cbAndroid.isChecked()) {
        subjects.append("Android ");
      }
      if (cbPython.isChecked()) {
        subjects.append("Python ");
      }
      Toast.makeText(this, "Class: " + className + "\\nSubjects: " + subjects.toString().trim(), Toast.LENGTH_LONG).show();
    });
  }
}`,

  "12-Q2B": `AndroidManifest.xml:
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.mapsearch">

    <application>
        <meta-data
            android:name="com.google.android.geo.API_KEY"
            android:value="YOUR_KEY" />
    </application>
</manifest>

activity_maps.xml:
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <EditText
        android:id="@+id/etSearch"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Search Location" />

    <Button
        android:id="@+id/btnSearch"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Search" />

    <fragment
        android:id="@+id/map"
        android:name="com.google.android.gms.maps.SupportMapFragment"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />
</LinearLayout>

MapsActivity.java:
import android.location.Address;
import android.location.Geocoder;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import androidx.fragment.app.FragmentActivity;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;
import java.util.List;
import java.util.Locale;

public class MapsActivity extends FragmentActivity implements OnMapReadyCallback {
  private GoogleMap gMap;
  private EditText etSearch;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_maps);

    etSearch = findViewById(R.id.etSearch);
    Button btnSearch = findViewById(R.id.btnSearch);
    SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager().findFragmentById(R.id.map);
    if (mapFragment != null) {
      mapFragment.getMapAsync(this);
    }

    btnSearch.setOnClickListener(v -> searchLocation());
  }

  @Override
  public void onMapReady(GoogleMap googleMap) {
    gMap = googleMap;
  }

  private void searchLocation() {
    try {
      Geocoder geocoder = new Geocoder(this, Locale.getDefault());
      List<Address> list = geocoder.getFromLocationName(etSearch.getText().toString(), 1);
      if (list != null && !list.isEmpty()) {
        Address address = list.get(0);
        LatLng latLng = new LatLng(address.getLatitude(), address.getLongitude());
        gMap.clear();
        gMap.addMarker(new MarkerOptions().position(latLng).title(etSearch.getText().toString()));
        gMap.animateCamera(CameraUpdateFactory.newLatLngZoom(latLng, 14f));
      } else {
        Toast.makeText(this, "Location not found", Toast.LENGTH_SHORT).show();
      }
    } catch (Exception e) {
      Toast.makeText(this, e.getMessage(), Toast.LENGTH_SHORT).show();
    }
  }
}`,

  "13-Q2A": `activity_main.xml:
<TableLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:padding="16dp">

    <TableRow>
        <TextView android:text="Username" />
        <EditText android:id="@+id/etUser" android:layout_width="match_parent" android:layout_height="wrap_content" />
    </TableRow>

    <TableRow>
        <TextView android:text="Password" />
        <EditText android:id="@+id/etPass" android:layout_width="match_parent" android:layout_height="wrap_content" android:inputType="textPassword" />
    </TableRow>

    <TableRow>
        <Button android:id="@+id/btnLogin" android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Login" />
    </TableRow>
</TableLayout>

MainActivity.java:
import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    EditText etUser = findViewById(R.id.etUser);
    EditText etPass = findViewById(R.id.etPass);
    Button btnLogin = findViewById(R.id.btnLogin);

    btnLogin.setOnClickListener(v -> {
      String user = etUser.getText().toString();
      String pass = etPass.getText().toString();
      if ("admin".equals(user) && "admin".equals(pass)) {
        Toast.makeText(this, "Login Successful", Toast.LENGTH_SHORT).show();
        startActivity(new Intent(this, WelcomeActivity.class));
      } else {
        Toast.makeText(this, "Invalid Login", Toast.LENGTH_SHORT).show();
      }
    });
  }
}

WelcomeActivity.java:
import android.os.Bundle;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class WelcomeActivity extends AppCompatActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    TextView textView = new TextView(this);
    textView.setText("Welcome");
    textView.setTextSize(24f);
    setContentView(textView);
  }
}`,

  "13-Q2B": `DBHelper.java:
import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public class DBHelper extends SQLiteOpenHelper {
  public DBHelper(Context context) {
    super(context, "StudentDB", null, 1);
  }

  @Override
  public void onCreate(SQLiteDatabase db) {
    db.execSQL("CREATE TABLE Student(Sid INTEGER PRIMARY KEY AUTOINCREMENT,Sname TEXT,phno TEXT)");
  }

  @Override
  public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
    db.execSQL("DROP TABLE IF EXISTS Student");
    onCreate(db);
  }

  public long insertStudent(String name, String phone) {
    ContentValues values = new ContentValues();
    values.put("Sname", name);
    values.put("phno", phone);
    return getWritableDatabase().insert("Student", null, values);
  }

  public int deleteStudent(int sid) {
    return getWritableDatabase().delete("Student", "Sid=?", new String[]{String.valueOf(sid)});
  }

  public Cursor getAllStudents() {
    return getReadableDatabase().rawQuery("SELECT * FROM Student", null);
  }
}

MainActivity.java:
import android.database.Cursor;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    DBHelper dbHelper = new DBHelper(this);
    EditText etName = findViewById(R.id.etName);
    EditText etPhone = findViewById(R.id.etPhone);
    EditText etSid = findViewById(R.id.etSid);
    TextView tvResult = findViewById(R.id.tvResult);
    Button btnAdd = findViewById(R.id.btnAdd);
    Button btnDelete = findViewById(R.id.btnDelete);
    Button btnShow = findViewById(R.id.btnShow);

    btnAdd.setOnClickListener(v -> dbHelper.insertStudent(etName.getText().toString(), etPhone.getText().toString()));
    btnDelete.setOnClickListener(v -> dbHelper.deleteStudent(Integer.parseInt(etSid.getText().toString())));
    btnShow.setOnClickListener(v -> {
      Cursor cursor = dbHelper.getAllStudents();
      StringBuilder builder = new StringBuilder();
      while (cursor.moveToNext()) {
        builder.append(cursor.getInt(0)).append(" | ")
          .append(cursor.getString(1)).append(" | ")
          .append(cursor.getString(2)).append("\\n");
      }
      tvResult.setText(builder.toString());
    });
  }
}

activity_main.xml:
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="16dp">

    <EditText android:id="@+id/etName" android:layout_width="match_parent" android:layout_height="wrap_content" android:hint="Student Name" />
    <EditText android:id="@+id/etPhone" android:layout_width="match_parent" android:layout_height="wrap_content" android:hint="Phone" android:inputType="phone" />
    <EditText android:id="@+id/etSid" android:layout_width="match_parent" android:layout_height="wrap_content" android:hint="Student Id for Delete" android:inputType="number" />
    <Button android:id="@+id/btnAdd" android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Add" />
    <Button android:id="@+id/btnDelete" android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Delete" />
    <Button android:id="@+id/btnShow" android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Show All" />
    <TextView android:id="@+id/tvResult" android:layout_width="match_parent" android:layout_height="wrap_content" android:paddingTop="16dp" />
</LinearLayout>`,

  "14-Q2A": `MainActivity.java:
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.widget.Button;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    Button btnSendEmail = findViewById(R.id.btnSendEmail);
    btnSendEmail.setOnClickListener(v -> {
      Intent intent = new Intent(Intent.ACTION_SEND);
      intent.setType("*/*");
      intent.putExtra(Intent.EXTRA_EMAIL, new String[]{"recipient@example.com"});
      intent.putExtra(Intent.EXTRA_SUBJECT, "Test Mail");
      intent.putExtra(Intent.EXTRA_TEXT, "Mail sent from Android application");
      intent.putExtra(Intent.EXTRA_STREAM, Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.sample));
      startActivity(Intent.createChooser(intent, "Send Email"));
    });
  }
}

activity_main.xml:
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:orientation="vertical">

    <Button
        android:id="@+id/btnSendEmail"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Send Email" />
</LinearLayout>`,

  "14-Q2B": `AndroidManifest.xml:
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-permission android:name="android.permission.INTERNET" />
    <application>
        <service android:name=".DownloadService" />
    </application>
</manifest>

DownloadService.java:
import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;

public class DownloadService extends Service {
  @Override
  public int onStartCommand(Intent intent, int flags, int startId) {
    new Thread(() -> {
      try {
        URL url = new URL("https://example.com/file.txt");
        URLConnection connection = url.openConnection();
        InputStream inputStream = connection.getInputStream();
        File file = new File(getExternalFilesDir(null), "downloaded_file.txt");
        FileOutputStream outputStream = new FileOutputStream(file);
        byte[] buffer = new byte[1024];
        int length;
        while ((length = inputStream.read(buffer)) != -1) {
          outputStream.write(buffer, 0, length);
        }
        outputStream.close();
        inputStream.close();
        Intent completeIntent = new Intent("DOWNLOAD_COMPLETE");
        completeIntent.putExtra("path", file.getAbsolutePath());
        sendBroadcast(completeIntent);
      } catch (Exception ignored) {
      }
      stopSelf();
    }).start();
    return START_NOT_STICKY;
  }

  @Override
  public IBinder onBind(Intent intent) {
    return null;
  }
}

MainActivity.java:
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
  private TextView tvStatus;
  private final BroadcastReceiver receiver = new BroadcastReceiver() {
    @Override
    public void onReceive(Context context, Intent intent) {
      tvStatus.setText("Downloaded: " + intent.getStringExtra("path"));
    }
  };

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    tvStatus = findViewById(R.id.tvStatus);
    Button btnDownload = findViewById(R.id.btnDownload);
    registerReceiver(receiver, new IntentFilter("DOWNLOAD_COMPLETE"));
    btnDownload.setOnClickListener(v -> startService(new Intent(this, DownloadService.class)));
  }

  @Override
  protected void onDestroy() {
    super.onDestroy();
    unregisterReceiver(receiver);
  }
}

activity_main.xml:
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:orientation="vertical"
    android:padding="16dp">

    <Button
        android:id="@+id/btnDownload"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Download File" />

    <TextView
        android:id="@+id/tvStatus"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:paddingTop="16dp" />
</LinearLayout>`,

  "16-Q2B": `activity_main.xml:
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:orientation="vertical"
    android:padding="16dp">

    <TimePicker
        android:id="@+id/timePicker"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content" />

    <Button
        android:id="@+id/btnGetTime"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Get Time" />

    <TextView
        android:id="@+id/tvResult"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content" />
</LinearLayout>

MainActivity.java:
import android.os.Build;
import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;
import android.widget.TimePicker;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    TimePicker timePicker = findViewById(R.id.timePicker);
    TextView tvResult = findViewById(R.id.tvResult);
    Button btnGetTime = findViewById(R.id.btnGetTime);

    btnGetTime.setOnClickListener(v -> {
      int hour;
      int minute;
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
        hour = timePicker.getHour();
        minute = timePicker.getMinute();
      } else {
        hour = timePicker.getCurrentHour();
        minute = timePicker.getCurrentMinute();
      }
      tvResult.setText("Selected Time: " + hour + ":" + minute);
    });
  }
}`,

  "18-Q1B": `ChatServer.java:
import java.awt.BorderLayout;
import java.awt.event.ActionEvent;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.JTextField;
import javax.swing.SwingUtilities;

public class ChatServer extends JFrame {
  private final JTextArea area = new JTextArea();
  private final JTextField field = new JTextField();
  private PrintWriter out;

  public ChatServer() {
    setTitle("Chat Server");
    area.setEditable(false);
    add(new JScrollPane(area), BorderLayout.CENTER);
    JButton send = new JButton("Send");
    send.addActionListener(this::sendMessage);
    field.addActionListener(this::sendMessage);
    add(field, BorderLayout.NORTH);
    add(send, BorderLayout.SOUTH);
    setSize(420, 320);
    setDefaultCloseOperation(EXIT_ON_CLOSE);
    setVisible(true);
  }

  private void sendMessage(ActionEvent event) {
    if (out == null) {
      return;
    }
    String message = field.getText().toString().trim();
    if (message.isEmpty()) {
      return;
    }
    out.println(message);
    area.append("Server: " + message + "\\n");
    field.setText("");
  }

  private void startServer() throws Exception {
    ServerSocket serverSocket = new ServerSocket(5000);
    Socket socket = serverSocket.accept();
    out = new PrintWriter(socket.getOutputStream(), true);
    BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
    new Thread(() -> {
      try {
        String line;
        while ((line = in.readLine()) != null) {
          SwingUtilities.invokeLater(() -> area.append("Client: " + line + "\\n"));
        }
      } catch (Exception ignored) {
      }
    }).start();
  }

  public static void main(String[] args) throws Exception {
    ChatServer server = new ChatServer();
    server.startServer();
  }
}

ChatClient.java:
import java.awt.BorderLayout;
import java.awt.event.ActionEvent;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.JTextField;
import javax.swing.SwingUtilities;

public class ChatClient extends JFrame {
  private final JTextArea area = new JTextArea();
  private final JTextField field = new JTextField();
  private PrintWriter out;

  public ChatClient() {
    setTitle("Chat Client");
    area.setEditable(false);
    add(new JScrollPane(area), BorderLayout.CENTER);
    JButton send = new JButton("Send");
    send.addActionListener(this::sendMessage);
    field.addActionListener(this::sendMessage);
    add(field, BorderLayout.NORTH);
    add(send, BorderLayout.SOUTH);
    setSize(420, 320);
    setDefaultCloseOperation(EXIT_ON_CLOSE);
    setVisible(true);
  }

  private void sendMessage(ActionEvent event) {
    if (out == null) {
      return;
    }
    String message = field.getText().trim();
    if (message.isEmpty()) {
      return;
    }
    out.println(message);
    area.append("Client: " + message + "\\n");
    field.setText("");
  }

  private void startClient() throws Exception {
    Socket socket = new Socket("localhost", 5000);
    out = new PrintWriter(socket.getOutputStream(), true);
    BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
    new Thread(() -> {
      try {
        String line;
        while ((line = in.readLine()) != null) {
          SwingUtilities.invokeLater(() -> area.append("Server: " + line + "\\n"));
        }
      } catch (Exception ignored) {
      }
    }).start();
  }

  public static void main(String[] args) throws Exception {
    ChatClient client = new ChatClient();
    client.startClient();
  }
}`,

  "18-Q2A": `activity_main.xml:
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="16dp">

    <EditText android:id="@+id/etFirst" android:layout_width="match_parent" android:layout_height="wrap_content" android:hint="First Number" android:inputType="number" />
    <EditText android:id="@+id/etSecond" android:layout_width="match_parent" android:layout_height="wrap_content" android:hint="Second Number" android:inputType="number" />
    <Button android:id="@+id/btnCheck" android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Check" />
    <TextView android:id="@+id/tvResult" android:layout_width="match_parent" android:layout_height="wrap_content" android:paddingTop="16dp" />
</LinearLayout>

MainActivity.java:
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    EditText etFirst = findViewById(R.id.etFirst);
    EditText etSecond = findViewById(R.id.etSecond);
    TextView tvResult = findViewById(R.id.tvResult);
    Button btnCheck = findViewById(R.id.btnCheck);

    btnCheck.setOnClickListener(v -> {
      int first = Integer.parseInt(etFirst.getText().toString());
      int second = Integer.parseInt(etSecond.getText().toString());
      if (first > 10 && second > 10) {
        Toast.makeText(this, "Both numbers must not be greater than 10", Toast.LENGTH_SHORT).show();
        etFirst.setText("");
        etSecond.setText("");
        tvResult.setText("");
      } else {
        tvResult.setText("Accepted: " + first + " and " + second);
      }
    });
  }
}`,

  "19-Q2A": `activity_main.xml:
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="16dp">

    <EditText android:id="@+id/etList1" android:layout_width="match_parent" android:layout_height="wrap_content" android:hint="List 1" />
    <EditText android:id="@+id/etList2" android:layout_width="match_parent" android:layout_height="wrap_content" android:hint="List 2" />
    <Button android:id="@+id/btnMerge" android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Merge" />
    <EditText android:id="@+id/etMerged" android:layout_width="match_parent" android:layout_height="wrap_content" android:hint="Merged List" android:enabled="false" />
</LinearLayout>

MainActivity.java:
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import androidx.appcompat.app.AppCompatActivity;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class MainActivity extends AppCompatActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    EditText etList1 = findViewById(R.id.etList1);
    EditText etList2 = findViewById(R.id.etList2);
    EditText etMerged = findViewById(R.id.etMerged);
    Button btnMerge = findViewById(R.id.btnMerge);

    btnMerge.setOnClickListener(v -> {
      List<String> merged = new ArrayList<>();
      merged.addAll(Arrays.asList(etList1.getText().toString().split(",")));
      merged.addAll(Arrays.asList(etList2.getText().toString().split(",")));
      etMerged.setText(merged.toString());
    });
  }
}`,

  "19-Q2B": `activity_main.xml:
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="16dp">

    <TextView
        android:id="@+id/tvDisplay"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:gravity="end"
        android:text="0"
        android:textSize="32sp" />

    <EditText
        android:id="@+id/etExpression"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Example 10+20" />

    <Button android:id="@+id/btnAdd" android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Add" />
    <Button android:id="@+id/btnSub" android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Subtract" />
    <Button android:id="@+id/btnMul" android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Multiply" />
    <Button android:id="@+id/btnDiv" android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Divide" />
</LinearLayout>

MainActivity.java:
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
  private double first;
  private double second;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    EditText etExpression = findViewById(R.id.etExpression);
    TextView tvDisplay = findViewById(R.id.tvDisplay);
    Button btnAdd = findViewById(R.id.btnAdd);
    Button btnSub = findViewById(R.id.btnSub);
    Button btnMul = findViewById(R.id.btnMul);
    Button btnDiv = findViewById(R.id.btnDiv);

    Runnable parseValues = () -> {
      String[] parts = etExpression.getText().toString().split(",");
      first = Double.parseDouble(parts[0].trim());
      second = Double.parseDouble(parts[1].trim());
    };

    btnAdd.setOnClickListener(v -> {
      parseValues.run();
      tvDisplay.setText(String.valueOf(first + second));
    });
    btnSub.setOnClickListener(v -> {
      parseValues.run();
      tvDisplay.setText(String.valueOf(first - second));
    });
    btnMul.setOnClickListener(v -> {
      parseValues.run();
      tvDisplay.setText(String.valueOf(first * second));
    });
    btnDiv.setOnClickListener(v -> {
      parseValues.run();
      tvDisplay.setText(String.valueOf(first / second));
    });
  }
}`,

  "21-Q2A": `activity_main.xml:
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:orientation="vertical"
    android:padding="16dp">

    <Button android:id="@+id/btnPick" android:layout_width="wrap_content" android:layout_height="wrap_content" android:text="Pick Date" />
    <TextView android:id="@+id/tvDate" android:layout_width="wrap_content" android:layout_height="wrap_content" android:paddingTop="16dp" />
</LinearLayout>

MainActivity.java:
import android.app.DatePickerDialog;
import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
import java.util.Calendar;

public class MainActivity extends AppCompatActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    TextView tvDate = findViewById(R.id.tvDate);
    Button btnPick = findViewById(R.id.btnPick);

    btnPick.setOnClickListener(v -> {
      Calendar calendar = Calendar.getInstance();
      DatePickerDialog dialog = new DatePickerDialog(
        this,
        (view, year, month, dayOfMonth) -> tvDate.setText(dayOfMonth + "/" + (month + 1) + "/" + year),
        calendar.get(Calendar.YEAR),
        calendar.get(Calendar.MONTH),
        calendar.get(Calendar.DAY_OF_MONTH)
      );
      dialog.show();
    });
  }
}`,

  "22-Q1B": `account.html:
<form action="account.jsp" method="post">
  Account Number: <input type="text" name="ano"><br>
  Type: <input type="text" name="type"><br>
  Balance: <input type="text" name="bal"><br>
  <input type="submit" value="Save">
</form>

account.jsp:
<%@ page import="java.sql.*" %>
<%
  String ano = request.getParameter("ano");
  String type = request.getParameter("type");
  String bal = request.getParameter("bal");
  Class.forName("com.mysql.cj.jdbc.Driver");
  Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/college", "root", "root");
  if (ano != null && type != null && bal != null) {
    PreparedStatement ps = con.prepareStatement("INSERT INTO Account VALUES(?,?,?)");
    ps.setInt(1, Integer.parseInt(ano));
    ps.setString(2, type);
    ps.setDouble(3, Double.parseDouble(bal));
    ps.executeUpdate();
  }
  Statement st = con.createStatement();
  ResultSet rs = st.executeQuery("SELECT * FROM Account");
%>
<html>
<body>
<table border="1">
  <tr>
    <th>ANo</th>
    <th>Type</th>
    <th>Balance</th>
  </tr>
  <%
    while (rs.next()) {
  %>
  <tr>
    <td><%= rs.getInt(1) %></td>
    <td><%= rs.getString(2) %></td>
    <td><%= rs.getDouble(3) %></td>
  </tr>
  <%
    }
    con.close();
  %>
</table>
</body>
</html>`,

  "22-Q2B": `activity_main.xml:
<GridView xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/gridView"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:numColumns="3" />

MainActivity.java:
import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.GridView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    String[] items = {"Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Holiday", "Week"};
    GridView gridView = findViewById(R.id.gridView);
    gridView.setAdapter(new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, items));
    gridView.setOnItemClickListener((parent, view, position, id) ->
      Toast.makeText(this, items[position], Toast.LENGTH_SHORT).show()
    );
  }
}`,

  "23-Q1B": `LoginServlet.java:
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse res) throws java.io.IOException {
    res.setContentType("text/html");
    PrintWriter out = res.getWriter();
    out.println("<html><body><form method='post'>");
    out.println("Username: <input type='text' name='username'><br>");
    out.println("Password: <input type='password' name='password'><br>");
    out.println("<input type='submit' value='Login'>");
    out.println("</form></body></html>");
  }

  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse res) throws java.io.IOException {
    res.setContentType("text/html");
    PrintWriter out = res.getWriter();
    try {
      Class.forName("com.mysql.cj.jdbc.Driver");
      Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/college", "root", "root");
      PreparedStatement ps = con.prepareStatement("SELECT * FROM users WHERE username=? AND password=?");
      ps.setString(1, req.getParameter("username"));
      ps.setString(2, req.getParameter("password"));
      ResultSet rs = ps.executeQuery();
      out.println(rs.next() ? "<h2>Login Successful</h2>" : "<h2>Invalid Username or Password</h2>");
      con.close();
    } catch (Exception e) {
      out.println("<h2>Error: " + e.getMessage() + "</h2>");
    }
  }
}`,

  "23-Q2A": `activity_main.xml:
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:orientation="vertical"
    android:padding="16dp">

    <EditText
        android:id="@+id/etDate"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:focusable="false"
        android:hint="Tap to Pick Date" />
</LinearLayout>

MainActivity.java:
import android.app.DatePickerDialog;
import android.os.Bundle;
import android.widget.EditText;
import androidx.appcompat.app.AppCompatActivity;
import java.util.Calendar;

public class MainActivity extends AppCompatActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    EditText etDate = findViewById(R.id.etDate);
    etDate.setOnClickListener(v -> {
      Calendar calendar = Calendar.getInstance();
      new DatePickerDialog(
        this,
        (view, year, month, dayOfMonth) -> etDate.setText(dayOfMonth + "/" + (month + 1) + "/" + year),
        calendar.get(Calendar.YEAR),
        calendar.get(Calendar.MONTH),
        calendar.get(Calendar.DAY_OF_MONTH)
      ).show();
    });
  }
}`,

  "23-Q2B": `item_book.xml:
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="horizontal"
    android:padding="8dp">

    <TextView
        android:id="@+id/tvBook"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_weight="1"
        android:textSize="16sp" />

    <TextView
        android:id="@+id/tvAuthor"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_weight="1"
        android:textSize="14sp" />
</LinearLayout>

MainActivity.java:
import android.os.Bundle;
import android.widget.ListView;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    String[][] books = {
      {"Java", "Herbert Schildt"},
      {"Android", "Head First"},
      {"DBMS", "Korth"},
      {"Python", "Guido"}
    };

    ListView listView = findViewById(R.id.listView);
    listView.setAdapter(new BookAdapter(this, books));
  }
}

BookAdapter.java:
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

public class BookAdapter extends ArrayAdapter<String[]> {
  private final String[][] data;

  public BookAdapter(Context context, String[][] data) {
    super(context, R.layout.item_book, data);
    this.data = data;
  }

  @Override
  public View getView(int position, View convertView, ViewGroup parent) {
    View view = convertView;
    if (view == null) {
      view = LayoutInflater.from(getContext()).inflate(R.layout.item_book, parent, false);
    }
    TextView tvBook = view.findViewById(R.id.tvBook);
    TextView tvAuthor = view.findViewById(R.id.tvAuthor);
    tvBook.setText(data[position][0]);
    tvAuthor.setText(data[position][1]);
    return view;
  }
}

activity_main.xml:
<ListView xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/listView"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />`,

  "24-Q2A": `activity_main.xml:
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:orientation="vertical"
    android:padding="16dp">

    <Switch
        android:id="@+id/mySwitch"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Switch" />

    <ToggleButton
        android:id="@+id/myToggle"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:textOn="Toggle ON"
        android:textOff="Toggle OFF" />

    <TextView
        android:id="@+id/tvResult"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:paddingTop="16dp" />
</LinearLayout>

MainActivity.java:
import android.os.Bundle;
import android.widget.Switch;
import android.widget.TextView;
import android.widget.ToggleButton;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    Switch mySwitch = findViewById(R.id.mySwitch);
    ToggleButton myToggle = findViewById(R.id.myToggle);
    TextView tvResult = findViewById(R.id.tvResult);

    mySwitch.setOnCheckedChangeListener((buttonView, isChecked) ->
      tvResult.setText("Switch: " + (isChecked ? "ON" : "OFF"))
    );

    myToggle.setOnCheckedChangeListener((buttonView, isChecked) ->
      tvResult.setText("Toggle: " + (isChecked ? "ON" : "OFF"))
    );
  }
}`,

  "24-Q2B": `DBHelper.java:
import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public class DBHelper extends SQLiteOpenHelper {
  public DBHelper(Context context) {
    super(context, "CompanyDB", null, 1);
  }

  @Override
  public void onCreate(SQLiteDatabase db) {
    db.execSQL("CREATE TABLE Company(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,address TEXT,phno TEXT)");
  }

  @Override
  public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
    db.execSQL("DROP TABLE IF EXISTS Company");
    onCreate(db);
  }

  public long insertCompany(String name, String address, String phone) {
    ContentValues values = new ContentValues();
    values.put("name", name);
    values.put("address", address);
    values.put("phno", phone);
    return getWritableDatabase().insert("Company", null, values);
  }

  public Cursor getAllCompanies() {
    return getReadableDatabase().rawQuery("SELECT * FROM Company", null);
  }
}

MainActivity.java:
import android.database.Cursor;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    DBHelper dbHelper = new DBHelper(this);
    EditText etName = findViewById(R.id.etName);
    EditText etAddress = findViewById(R.id.etAddress);
    EditText etPhone = findViewById(R.id.etPhone);
    TextView tvResult = findViewById(R.id.tvResult);
    Button btnInsert = findViewById(R.id.btnInsert);
    Button btnShow = findViewById(R.id.btnShow);

    btnInsert.setOnClickListener(v ->
      dbHelper.insertCompany(etName.getText().toString(), etAddress.getText().toString(), etPhone.getText().toString())
    );

    btnShow.setOnClickListener(v -> {
      Cursor cursor = dbHelper.getAllCompanies();
      StringBuilder builder = new StringBuilder();
      while (cursor.moveToNext()) {
        builder.append(cursor.getInt(0)).append(" | ")
          .append(cursor.getString(1)).append(" | ")
          .append(cursor.getString(2)).append(" | ")
          .append(cursor.getString(3)).append("\\n");
      }
      tvResult.setText(builder.toString());
    });
  }
}

activity_main.xml:
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="16dp">

    <EditText android:id="@+id/etName" android:layout_width="match_parent" android:layout_height="wrap_content" android:hint="Company Name" />
    <EditText android:id="@+id/etAddress" android:layout_width="match_parent" android:layout_height="wrap_content" android:hint="Address" />
    <EditText android:id="@+id/etPhone" android:layout_width="match_parent" android:layout_height="wrap_content" android:hint="Phone" android:inputType="phone" />
    <Button android:id="@+id/btnInsert" android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Insert" />
    <Button android:id="@+id/btnShow" android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Show All" />
    <TextView android:id="@+id/tvResult" android:layout_width="match_parent" android:layout_height="wrap_content" android:paddingTop="16dp" />
</LinearLayout>`,

  "25-Q2A": `activity_main.xml:
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:orientation="vertical"
    android:padding="16dp">

    <RatingBar
        android:id="@+id/ratingBar"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:numStars="5"
        android:stepSize="1.0" />

    <TextView
        android:id="@+id/tvRating"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Rating: 0" />

    <Button
        android:id="@+id/btnRate"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Rate" />
</LinearLayout>

MainActivity.java:
import android.os.Bundle;
import android.widget.Button;
import android.widget.RatingBar;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    RatingBar ratingBar = findViewById(R.id.ratingBar);
    TextView tvRating = findViewById(R.id.tvRating);
    Button btnRate = findViewById(R.id.btnRate);

    ratingBar.setOnRatingBarChangeListener((bar, rating, fromUser) -> tvRating.setText("Rating: " + rating));
    btnRate.setOnClickListener(v ->
      Toast.makeText(this, "You rated " + ratingBar.getRating() + " stars", Toast.LENGTH_SHORT).show()
    );
  }
}`,

  "25-Q2B": `DBHelper.java:
import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public class DBHelper extends SQLiteOpenHelper {
  public DBHelper(Context context) {
    super(context, "EmpDB", null, 1);
  }

  @Override
  public void onCreate(SQLiteDatabase db) {
    db.execSQL("CREATE TABLE Employee(Eno INTEGER PRIMARY KEY AUTOINCREMENT,Ename TEXT,Designation TEXT,Salary REAL)");
  }

  @Override
  public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
    db.execSQL("DROP TABLE IF EXISTS Employee");
    onCreate(db);
  }

  public long insertEmployee(String name, String designation, double salary) {
    ContentValues values = new ContentValues();
    values.put("Ename", name);
    values.put("Designation", designation);
    values.put("Salary", salary);
    return getWritableDatabase().insert("Employee", null, values);
  }

  public Cursor getAllEmployees() {
    return getReadableDatabase().rawQuery("SELECT * FROM Employee", null);
  }
}

MainActivity.java:
import android.database.Cursor;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    DBHelper dbHelper = new DBHelper(this);
    EditText etName = findViewById(R.id.etName);
    EditText etDesignation = findViewById(R.id.etDesignation);
    EditText etSalary = findViewById(R.id.etSalary);
    TextView tvResult = findViewById(R.id.tvResult);
    Button btnInsert = findViewById(R.id.btnInsert);
    Button btnShow = findViewById(R.id.btnShow);

    btnInsert.setOnClickListener(v ->
      dbHelper.insertEmployee(
        etName.getText().toString(),
        etDesignation.getText().toString(),
        Double.parseDouble(etSalary.getText().toString())
      )
    );

    btnShow.setOnClickListener(v -> {
      Cursor cursor = dbHelper.getAllEmployees();
      StringBuilder builder = new StringBuilder();
      while (cursor.moveToNext()) {
        builder.append(cursor.getInt(0)).append(" | ")
          .append(cursor.getString(1)).append(" | ")
          .append(cursor.getString(2)).append(" | ")
          .append(cursor.getDouble(3)).append("\\n");
      }
      tvResult.setText(builder.toString());
    });
  }
}

activity_main.xml:
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="16dp">

    <EditText android:id="@+id/etName" android:layout_width="match_parent" android:layout_height="wrap_content" android:hint="Employee Name" />
    <EditText android:id="@+id/etDesignation" android:layout_width="match_parent" android:layout_height="wrap_content" android:hint="Designation" />
    <EditText android:id="@+id/etSalary" android:layout_width="match_parent" android:layout_height="wrap_content" android:hint="Salary" android:inputType="numberDecimal" />
    <Button android:id="@+id/btnInsert" android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Insert" />
    <Button android:id="@+id/btnShow" android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Show All" />
    <TextView android:id="@+id/tvResult" android:layout_width="match_parent" android:layout_height="wrap_content" android:paddingTop="16dp" />
</LinearLayout>`,

  "26-Q2A": `activity_main.xml:
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="16dp">

    <EditText android:id="@+id/etNumber" android:layout_width="match_parent" android:layout_height="wrap_content" android:hint="Enter Number" android:inputType="number" />
    <Button android:id="@+id/btnShow" android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Show Table" />
    <TableLayout android:id="@+id/tableLayout" android:layout_width="match_parent" android:layout_height="wrap_content" android:stretchColumns="1" />
</LinearLayout>

MainActivity.java:
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TableLayout;
import android.widget.TableRow;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    EditText etNumber = findViewById(R.id.etNumber);
    Button btnShow = findViewById(R.id.btnShow);
    TableLayout tableLayout = findViewById(R.id.tableLayout);

    btnShow.setOnClickListener(v -> {
      int number = Integer.parseInt(etNumber.getText().toString());
      tableLayout.removeAllViews();
      for (int i = 1; i <= 10; i++) {
        TableRow row = new TableRow(this);
        TextView tvLeft = new TextView(this);
        TextView tvRight = new TextView(this);
        tvLeft.setText(number + " x " + i);
        tvRight.setText(String.valueOf(number * i));
        tvLeft.setPadding(16, 12, 16, 12);
        tvRight.setPadding(16, 12, 16, 12);
        row.addView(tvLeft);
        row.addView(tvRight);
        tableLayout.addView(row);
      }
    });
  }
}`,

  "26-Q2B": `activity_main.xml:
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="16dp">

    <Spinner android:id="@+id/spinnerSubjects" android:layout_width="match_parent" android:layout_height="wrap_content" />
    <Button android:id="@+id/btnNext" android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Next" />
    <TextView android:id="@+id/tvSelected" android:layout_width="match_parent" android:layout_height="wrap_content" android:paddingTop="16dp" />
</LinearLayout>

MainActivity.java:
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    String[] subjects = {"Data Structures", "Algorithms", "Web Technology", "Operating Systems", "DBMS"};
    Spinner spinner = findViewById(R.id.spinnerSubjects);
    TextView tvSelected = findViewById(R.id.tvSelected);
    Button btnNext = findViewById(R.id.btnNext);

    spinner.setAdapter(new ArrayAdapter<>(this, android.R.layout.simple_spinner_dropdown_item, subjects));
    spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
      @Override
      public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
        tvSelected.setText("Selected: " + subjects[position]);
      }

      @Override
      public void onNothingSelected(AdapterView<?> parent) {
      }
    });

    btnNext.setOnClickListener(v -> {
      Intent intent = new Intent(this, ResultActivity.class);
      intent.putExtra("subject", spinner.getSelectedItem().toString());
      startActivity(intent);
    });
  }
}

ResultActivity.java:
import android.os.Bundle;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class ResultActivity extends AppCompatActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    TextView textView = new TextView(this);
    textView.setText("Selected Subject: " + getIntent().getStringExtra("subject"));
    textView.setTextSize(22f);
    setContentView(textView);
  }
}`,

  "27-Q2A": `AndroidManifest.xml:
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.hybridmap">

    <application>
        <meta-data
            android:name="com.google.android.geo.API_KEY"
            android:value="YOUR_KEY" />
    </application>
</manifest>

activity_maps.xml:
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:gravity="center"
        android:orientation="horizontal"
        android:padding="8dp">

        <Button android:id="@+id/btnZoomIn" android:layout_width="wrap_content" android:layout_height="wrap_content" android:text="Zoom In" />
        <Button android:id="@+id/btnZoomOut" android:layout_width="wrap_content" android:layout_height="wrap_content" android:text="Zoom Out" />
    </LinearLayout>

    <fragment
        android:id="@+id/map"
        android:name="com.google.android.gms.maps.SupportMapFragment"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />
</LinearLayout>

MapsActivity.java:
import android.os.Bundle;
import android.widget.Button;
import androidx.fragment.app.FragmentActivity;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;

public class MapsActivity extends FragmentActivity implements OnMapReadyCallback {
  private GoogleMap gMap;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_maps);

    SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager().findFragmentById(R.id.map);
    if (mapFragment != null) {
      mapFragment.getMapAsync(this);
    }

    Button btnZoomIn = findViewById(R.id.btnZoomIn);
    Button btnZoomOut = findViewById(R.id.btnZoomOut);
    btnZoomIn.setOnClickListener(v -> {
      if (gMap != null) {
        gMap.animateCamera(CameraUpdateFactory.zoomIn());
      }
    });
    btnZoomOut.setOnClickListener(v -> {
      if (gMap != null) {
        gMap.animateCamera(CameraUpdateFactory.zoomOut());
      }
    });
  }

  @Override
  public void onMapReady(GoogleMap googleMap) {
    gMap = googleMap;
    gMap.setMapType(GoogleMap.MAP_TYPE_HYBRID);
    LatLng pune = new LatLng(18.5204, 73.8567);
    gMap.addMarker(new MarkerOptions().position(pune).title("Pune"));
    gMap.moveCamera(CameraUpdateFactory.newLatLngZoom(pune, 12f));
  }
}`,

  "28-Q2A": `MainActivity.java:
import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    EditText etName = findViewById(R.id.etName);
    Button btnSend = findViewById(R.id.btnSend);

    btnSend.setOnClickListener(v -> {
      String name = etName.getText().toString();
      String greet = "Hello, " + name + "! Welcome to our App!";
      Intent intent = new Intent(this, SecondActivity.class);
      intent.putExtra("name", name);
      intent.putExtra("greet", greet);
      startActivity(intent);
    });
  }
}

SecondActivity.java:
import android.os.Bundle;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class SecondActivity extends AppCompatActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_second);

    TextView tvResult = findViewById(R.id.tvResult);
    tvResult.setText("Name: " + getIntent().getStringExtra("name") + "\\n" + getIntent().getStringExtra("greet"));
  }
}

activity_main.xml:
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:orientation="vertical"
    android:padding="16dp">

    <EditText android:id="@+id/etName" android:layout_width="match_parent" android:layout_height="wrap_content" android:hint="Enter Name" />
    <Button android:id="@+id/btnSend" android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Send" />
</LinearLayout>

activity_second.xml:
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:padding="16dp">

    <TextView android:id="@+id/tvResult" android:layout_width="wrap_content" android:layout_height="wrap_content" android:textSize="20sp" />
</LinearLayout>`,

  "28-Q2B": `item_list.xml:
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="horizontal"
    android:padding="12dp">

    <ImageView
        android:id="@+id/imgIcon"
        android:layout_width="48dp"
        android:layout_height="48dp"
        android:src="@drawable/android_icon" />

    <LinearLayout
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="12dp"
        android:orientation="vertical">

        <TextView android:id="@+id/tvTitle" android:layout_width="wrap_content" android:layout_height="wrap_content" android:textStyle="bold" />
        <TextView android:id="@+id/tvDesc" android:layout_width="wrap_content" android:layout_height="wrap_content" />
    </LinearLayout>
</LinearLayout>

MainActivity.java:
import android.os.Bundle;
import android.widget.ListView;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    String[][] data = {
      {"Cupcake", "v1.5"},
      {"Donut", "v1.6"},
      {"Eclair", "v2.0"},
      {"Froyo", "v2.2"},
      {"Gingerbread", "v2.3"}
    };

    ListView listView = findViewById(R.id.listView);
    listView.setAdapter(new VersionAdapter(this, data));
  }
}

VersionAdapter.java:
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

public class VersionAdapter extends ArrayAdapter<String[]> {
  private final String[][] data;

  public VersionAdapter(Context context, String[][] data) {
    super(context, R.layout.item_list, data);
    this.data = data;
  }

  @Override
  public View getView(int position, View convertView, ViewGroup parent) {
    View view = convertView;
    if (view == null) {
      view = LayoutInflater.from(getContext()).inflate(R.layout.item_list, parent, false);
    }
    ImageView imgIcon = view.findViewById(R.id.imgIcon);
    TextView tvTitle = view.findViewById(R.id.tvTitle);
    TextView tvDesc = view.findViewById(R.id.tvDesc);
    tvTitle.setText(data[position][0]);
    tvDesc.setText(data[position][1]);
    imgIcon.setImageResource(R.drawable.android_icon);
    return view;
  }
}

activity_main.xml:
<ListView xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/listView"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />`,

  "29-Q2A": `MainActivity.java:
import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    EditText etName = findViewById(R.id.etName);
    EditText etYear = findViewById(R.id.etYear);
    EditText etCollection = findViewById(R.id.etCollection);
    Button btnShow = findViewById(R.id.btnShow);

    btnShow.setOnClickListener(v -> {
      Intent intent = new Intent(this, DetailActivity.class);
      intent.putExtra("name", etName.getText().toString());
      intent.putExtra("year", etYear.getText().toString());
      intent.putExtra("collection", etCollection.getText().toString());
      startActivity(intent);
    });
  }
}

DetailActivity.java:
import android.os.Bundle;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class DetailActivity extends AppCompatActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_detail);

    TextView tvResult = findViewById(R.id.tvResult);
    tvResult.setText(
      "Movie: " + getIntent().getStringExtra("name")
      + "\\nYear: " + getIntent().getStringExtra("year")
      + "\\nCollection: Rs. " + getIntent().getStringExtra("collection") + " Cr"
    );
  }
}

activity_main.xml:
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="16dp">

    <EditText android:id="@+id/etName" android:layout_width="match_parent" android:layout_height="wrap_content" android:hint="Movie Name" />
    <EditText android:id="@+id/etYear" android:layout_width="match_parent" android:layout_height="wrap_content" android:hint="Release Year" android:inputType="number" />
    <EditText android:id="@+id/etCollection" android:layout_width="match_parent" android:layout_height="wrap_content" android:hint="Collection" android:inputType="numberDecimal" />
    <Button android:id="@+id/btnShow" android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Show Details" />
</LinearLayout>

activity_detail.xml:
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:padding="16dp">

    <TextView android:id="@+id/tvResult" android:layout_width="wrap_content" android:layout_height="wrap_content" android:textSize="20sp" />
</LinearLayout>`
};

window.SLIP_OVERRIDES["15-Q2B"] = window.SLIP_OVERRIDES["12-Q2B"];
window.SLIP_OVERRIDES["21-Q2B"] = window.SLIP_OVERRIDES["10-Q2B"];
