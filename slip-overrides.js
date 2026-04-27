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

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />

    <application>
        <meta-data
            android:name="com.google.android.geo.API_KEY"
            android:value="YOUR_KEY" />
    </application>
</manifest>

MapsActivity.java:
import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Bundle;
import androidx.core.app.ActivityCompat;
import androidx.fragment.app.FragmentActivity;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;

public class MapsActivity extends FragmentActivity implements OnMapReadyCallback {
  private GoogleMap gMap;
  private FusedLocationProviderClient fusedLocationClient;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_maps);
    fusedLocationClient = LocationServices.getFusedLocationProviderClient(this);
    SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager().findFragmentById(R.id.map);
    if (mapFragment != null) {
      mapFragment.getMapAsync(this);
    }
  }

  @Override
  public void onMapReady(GoogleMap googleMap) {
    gMap = googleMap;
    gMap.setMapType(GoogleMap.MAP_TYPE_SATELLITE);
    if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION)
        != PackageManager.PERMISSION_GRANTED) {
      ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, 101);
      return;
    }
    gMap.setMyLocationEnabled(true);
    fusedLocationClient.getLastLocation().addOnSuccessListener(location -> {
      if (location != null) {
        LatLng current = new LatLng(location.getLatitude(), location.getLongitude());
        gMap.addMarker(new MarkerOptions().position(current).title("Current Location"));
        gMap.moveCamera(CameraUpdateFactory.newLatLngZoom(current, 15f));
      }
    });
  }

  @Override
  public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
    super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    if (requestCode == 101 && grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED && gMap != null) {
      onMapReady(gMap);
    }
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

    <uses-permission android:name="android.permission.INTERNET" />

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

    <uses-permission android:name="android.permission.INTERNET" />

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
    if (gMap == null) {
      Toast.makeText(this, "Map is loading", Toast.LENGTH_SHORT).show();
      return;
    }
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
          String received = line;
          SwingUtilities.invokeLater(() -> area.append("Client: " + received + "\\n"));
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
          String received = line;
          SwingUtilities.invokeLater(() -> area.append("Server: " + received + "\\n"));
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
  Class.forName("org.postgresql.Driver");
  Connection con = DriverManager.getConnection("jdbc:postgresql://localhost:5432/college", "postgres", "postgres");
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
      Class.forName("org.postgresql.Driver");
      Connection con = DriverManager.getConnection("jdbc:postgresql://localhost:5432/college", "postgres", "postgres");
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

    <uses-permission android:name="android.permission.INTERNET" />

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

Object.assign(window.SLIP_OVERRIDES, {
  "4-Q1A": `DeleteStudents.java:
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

public class DeleteStudents {
  public static void main(String[] args) {
    try {
      Class.forName("org.postgresql.Driver");
      Connection con = DriverManager.getConnection("jdbc:postgresql://localhost:5432/college", "postgres", "postgres");
      PreparedStatement ps = con.prepareStatement("DELETE FROM student WHERE sname LIKE ?");
      ps.setString(1, "S%");
      int rows = ps.executeUpdate();
      System.out.println(rows + " record(s) deleted.");
      con.close();
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}`,

  "4-Q1B": `InfoServlet.java:
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/info")
public class InfoServlet extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException {
    res.setContentType("text/html");
    PrintWriter out = res.getWriter();
    out.println("<html><body>");
    out.println("<h2>HTTP Request Information</h2>");
    out.println("<b>Client IP:</b> " + req.getRemoteAddr() + "<br>");
    out.println("<b>Browser:</b> " + req.getHeader("User-Agent") + "<br>");
    out.println("<b>OS:</b> " + System.getProperty("os.name") + "<br>");
    out.println("<b>Server Name:</b> " + req.getServerName() + "<br>");
    out.println("<b>Server Port:</b> " + req.getServerPort() + "<br>");
    out.println("<b>Method:</b> " + req.getMethod() + "<br>");
    out.println("</body></html>");
  }
}`,

  "7-Q1A": `email.html:
<form action="email.jsp" method="post">
    Email: <input type="text" name="email">
    <input type="submit" value="Validate">
</form>

email.jsp:
<%
String email = request.getParameter("email");
boolean valid = email != null && email.matches("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\\\.[a-zA-Z]{2,}");
%>
<html>
<body>
<h2 style="color:<%= valid ? "green" : "red" %>;">
    <%= valid ? "VALID Email" : "INVALID Email" %>
</h2>
</body>
</html>`,

  "7-Q1B": `NumberDisplay.java:
import java.awt.FlowLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextField;
import javax.swing.SwingUtilities;

public class NumberDisplay extends JFrame implements Runnable, ActionListener {
  private final JTextField textField = new JTextField(10);
  private final JButton button = new JButton("Start");

  public NumberDisplay() {
    setLayout(new FlowLayout());
    add(new JLabel("Number:"));
    add(textField);
    add(button);
    button.addActionListener(this);
    setSize(300, 120);
    setDefaultCloseOperation(EXIT_ON_CLOSE);
    setVisible(true);
  }

  @Override
  public void run() {
    for (int i = 1; i <= 100; i++) {
      final int number = i;
      SwingUtilities.invokeLater(() -> textField.setText(String.valueOf(number)));
      try {
        Thread.sleep(100);
      } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
        return;
      }
    }
  }

  @Override
  public void actionPerformed(ActionEvent e) {
    new Thread(this).start();
  }

  public static void main(String[] args) {
    new NumberDisplay();
  }
}`,

  "9-Q1A": `CreateEmp.java:
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.Statement;

public class CreateEmp {
  public static void main(String[] args) {
    try {
      Class.forName("org.postgresql.Driver");
      Connection con = DriverManager.getConnection("jdbc:postgresql://localhost:5432/college", "postgres", "postgres");
      Statement st = con.createStatement();
      st.executeUpdate("CREATE TABLE IF NOT EXISTS Emp(ENo INT PRIMARY KEY, EName VARCHAR(50), Sal DOUBLE)");

      PreparedStatement ps = con.prepareStatement("INSERT INTO Emp VALUES(?,?,?)");
      ps.setInt(1, 1);
      ps.setString(2, "Amit");
      ps.setDouble(3, 50000);
      ps.executeUpdate();

      ps.setInt(1, 2);
      ps.setString(2, "Seeta");
      ps.setDouble(3, 60000);
      ps.executeUpdate();

      System.out.println("Records inserted successfully.");
      con.close();
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}`,

  "9-Q1B": `page1.jsp:
<%@ page session="true" %>
<html>
<body>
<form action="page2.jsp" method="post">
    Item 1 Qty: <input type="text" name="qty1" value="1"> Price: Rs.100<br>
    Item 2 Qty: <input type="text" name="qty2" value="1"> Price: Rs.200<br>
    <input type="submit" value="Next Page">
</form>
</body>
</html>

page2.jsp:
<%@ page session="true" %>
<%
int qty1 = Integer.parseInt(request.getParameter("qty1"));
int qty2 = Integer.parseInt(request.getParameter("qty2"));
int p1Total = qty1 * 100 + qty2 * 200;
session.setAttribute("p1Total", p1Total);
%>
<html>
<body>
<form action="bill.jsp" method="post">
    Item 3 Qty: <input type="text" name="qty3" value="1"> Price: Rs.150<br>
    <input type="submit" value="Show Bill">
</form>
</body>
</html>

bill.jsp:
<%@ page session="true" %>
<%
int qty3 = Integer.parseInt(request.getParameter("qty3"));
int p2Total = qty3 * 150;
int p1 = (Integer) session.getAttribute("p1Total");
int grand = p1 + p2Total;
%>
<html>
<body>
<h2>BILL</h2>
<p>Page 1 Total: Rs.<%= p1 %></p>
<p>Page 2 Total: Rs.<%= p2Total %></p>
<h3>Grand Total: Rs.<%= grand %></h3>
</body>
</html>`,

  "10-Q1A": `hibernate.cfg.xml:
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE hibernate-configuration PUBLIC
        "-//Hibernate/Hibernate Configuration DTD 3.0//EN"
        "http://hibernate.sourceforge.net/hibernate-configuration-3.0.dtd">
<hibernate-configuration>
    <session-factory>
        <property name="connection.driver_class">org.postgresql.Driver</property>
        <property name="connection.url">jdbc:postgresql://localhost:5432/college</property>
        <property name="connection.username">postgres</property>
        <property name="connection.password">postgres</property>
        <property name="dialect">org.hibernate.dialect.PostgreSQLDialect</property>
        <property name="show_sql">true</property>
    </session-factory>
</hibernate-configuration>

HelloHibernate.java:
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class HelloHibernate {
  public static void main(String[] args) {
    SessionFactory sf = new Configuration().configure().buildSessionFactory();
    Session session = sf.openSession();
    System.out.println("Hello World from Hibernate!");
    System.out.println("Connection successful: " + session.isConnected());
    session.close();
    sf.close();
  }
}`,

  "10-Q1B": `ProductServlet.java:
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/products")
public class ProductServlet extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException {
    res.setContentType("text/html");
    PrintWriter out = res.getWriter();
    out.println("<html><body><h2>Product List</h2>");
    out.println("<table border='1'><tr><th>ProdCode</th><th>PName</th><th>Price</th></tr>");
    try {
      Class.forName("org.postgresql.Driver");
      Connection con = DriverManager.getConnection("jdbc:postgresql://localhost:5432/college", "postgres", "postgres");
      ResultSet rs = con.createStatement().executeQuery("SELECT * FROM Product");
      while (rs.next()) {
        out.println("<tr><td>" + rs.getString(1) + "</td><td>" + rs.getString(2) + "</td><td>" + rs.getDouble(3) + "</td></tr>");
      }
      con.close();
    } catch (Exception e) {
      out.println("<tr><td colspan='3'>" + e.getMessage() + "</td></tr>");
    }
    out.println("</table></body></html>");
  }
}`,

  "11-Q1A": `ClientInfo.java:
import java.net.InetAddress;

public class ClientInfo {
  public static void main(String[] args) {
    try {
      InetAddress ip = InetAddress.getLocalHost();
      System.out.println("IP Address: " + ip.getHostAddress());
      System.out.println("Host Name : " + ip.getHostName());
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}`,

  "11-Q1B": `SalesBetweenDates.java:
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class SalesBetweenDates {
  public static void main(String[] args) {
    String fromDate = "2024-01-01";
    String toDate = "2024-12-31";
    try {
      Class.forName("org.postgresql.Driver");
      Connection con = DriverManager.getConnection("jdbc:postgresql://localhost:5432/college", "postgres", "postgres");
      PreparedStatement ps = con.prepareStatement(
        "SELECT * FROM Sales WHERE sale_date BETWEEN ? AND ?"
      );
      ps.setString(1, fromDate);
      ps.setString(2, toDate);
      ResultSet rs = ps.executeQuery();
      while (rs.next()) {
        System.out.println(rs.getInt(1) + " " + rs.getString(2) + " " + rs.getDate(3) + " " + rs.getDouble(4));
      }
      con.close();
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}`,

  "12-Q1A": `CountRecords.java:
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;

public class CountRecords {
  public static void main(String[] args) {
    try {
      Class.forName("org.postgresql.Driver");
      Connection con = DriverManager.getConnection("jdbc:postgresql://localhost:5432/college", "postgres", "postgres");
      ResultSet rs = con.createStatement().executeQuery("SELECT COUNT(*) FROM student");
      if (rs.next()) {
        System.out.println("Total Records: " + rs.getInt(1));
      }
      con.close();
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}`,

  "12-Q1B": `ThreadLifecycleDemo.java:
public class ThreadLifecycleDemo extends Thread {
  @Override
  public void run() {
    try {
      System.out.println("Thread State inside run: " + getState());
      Thread.sleep(1000);
      System.out.println("Thread task completed.");
    } catch (InterruptedException e) {
      Thread.currentThread().interrupt();
    }
  }

  public static void main(String[] args) throws Exception {
    ThreadLifecycleDemo thread = new ThreadLifecycleDemo();
    System.out.println("NEW: " + thread.getState());
    thread.start();
    System.out.println("RUNNABLE: " + thread.getState());
    Thread.sleep(100);
    System.out.println("TIMED_WAITING/RUNNABLE: " + thread.getState());
    thread.join();
    System.out.println("TERMINATED: " + thread.getState());
  }
}`,

  "13-Q1A": `CurrentThreadDemo.java:
public class CurrentThreadDemo {
  public static void main(String[] args) {
    Thread thread = Thread.currentThread();
    System.out.println("Current Thread Name: " + thread.getName());
    System.out.println("Current Thread Priority: " + thread.getPriority());
  }
}`,

  "13-Q1B": `college.html:
<form action="college.jsp" method="post">
    College ID: <input type="text" name="cid"><br>
    College Name: <input type="text" name="cname"><br>
    Address: <input type="text" name="addr"><br>
    <input type="submit" value="Display">
</form>

college.jsp:
<%
String cid = request.getParameter("cid");
String cname = request.getParameter("cname");
String addr = request.getParameter("addr");
%>
<html>
<body>
<table border="1">
    <tr><th>CID</th><th>CName</th><th>Address</th></tr>
    <tr>
        <td><%= cid %></td>
        <td><%= cname %></td>
        <td><%= addr %></td>
    </tr>
</table>
</body>
</html>`,

  "14-Q1A": `voter.html:
<form action="voter.jsp" method="post">
    Name: <input type="text" name="name"><br>
    Age: <input type="text" name="age"><br>
    <input type="submit" value="Check">
</form>

voter.jsp:
<%
String name = request.getParameter("name");
int age = Integer.parseInt(request.getParameter("age"));
%>
<html>
<body>
<h2>
<%= age >= 18 ? name + " is eligible for voting." : name + " is not eligible for voting." %>
</h2>
</body>
</html>`,

  "14-Q1B": `ListFilesByExtension.java:
import java.io.File;

public class ListFilesByExtension {
  public static void main(String[] args) {
    String path = "C:/Users/Public/Documents";
    String extension = ".txt";
    File folder = new File(path);
    File[] files = folder.listFiles();
    if (files == null) {
      System.out.println("Directory not found.");
      return;
    }
    for (File file : files) {
      if (file.isFile() && file.getName().endsWith(extension)) {
        System.out.println(file.getName());
      }
    }
  }
}`,

  "15-Q1A": `AlphabetDisplay.java:
public class AlphabetDisplay extends Thread {
  @Override
  public void run() {
    try {
      for (char ch = 'A'; ch <= 'Z'; ch++) {
        System.out.println(ch);
        Thread.sleep(2000);
      }
    } catch (InterruptedException e) {
      Thread.currentThread().interrupt();
    }
  }

  public static void main(String[] args) {
    new AlphabetDisplay().start();
  }
}`,

  "15-Q1B": `StudentEntry.java:
import java.awt.FlowLayout;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextField;
import javax.swing.JOptionPane;

public class StudentEntry extends JFrame {
  public StudentEntry() {
    JTextField tfRoll = new JTextField(10);
    JTextField tfName = new JTextField(10);
    JTextField tfPer = new JTextField(10);
    JButton btnSave = new JButton("Save");

    setLayout(new FlowLayout());
    add(new JLabel("Roll No"));
    add(tfRoll);
    add(new JLabel("Name"));
    add(tfName);
    add(new JLabel("Percentage"));
    add(tfPer);
    add(btnSave);

    btnSave.addActionListener(e -> {
      try {
        Class.forName("org.postgresql.Driver");
        Connection con = DriverManager.getConnection("jdbc:postgresql://localhost:5432/college", "postgres", "postgres");
        PreparedStatement ps = con.prepareStatement("INSERT INTO student VALUES(?,?,?)");
        ps.setInt(1, Integer.parseInt(tfRoll.getText()));
        ps.setString(2, tfName.getText());
        ps.setDouble(3, Double.parseDouble(tfPer.getText()));
        ps.executeUpdate();
        JOptionPane.showMessageDialog(this, "Record Saved");
        con.close();
      } catch (Exception ex) {
        JOptionPane.showMessageDialog(this, ex.getMessage());
      }
    });

    setSize(350, 200);
    setDefaultCloseOperation(EXIT_ON_CLOSE);
    setVisible(true);
  }

  public static void main(String[] args) {
    new StudentEntry();
  }
}`,

  "15-Q2A": `activity_main.xml:
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:orientation="vertical"
    android:padding="16dp">

    <TextView
        android:layout_width="250dp"
        android:layout_height="wrap_content"
        android:background="@drawable/border_bg"
        android:gravity="center"
        android:padding="20dp"
        android:text="Android Layout with Border"
        android:textSize="20sp" />
</LinearLayout>

border_bg.xml:
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <solid android:color="#FFFFFF" />
    <stroke
        android:width="2dp"
        android:color="#000000" />
    <corners android:radius="8dp" />
</shape>`,

  "16-Q1A": `login.html:
<form action="login.jsp" method="post">
    Username: <input type="text" name="username"><br>
    Password: <input type="password" name="password"><br>
    <input type="submit" value="Login">
</form>

login.jsp:
<%
String username = request.getParameter("username");
String password = request.getParameter("password");
boolean valid = username != null && username.equals(password);
%>
<html>
<body>
<h2><%= valid ? "Login Successful" : "Invalid Login" %></h2>
</body>
</html>`,

  "16-Q1B": `HighestPercentage.java:
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class HighestPercentage {
  public static void main(String[] args) {
    try {
      Class.forName("org.postgresql.Driver");
      Connection con = DriverManager.getConnection("jdbc:postgresql://localhost:5432/college", "postgres", "postgres");

      PreparedStatement ps = con.prepareStatement("INSERT INTO student(rollno, sname, percentage) VALUES(?,?,?)");
      ps.setInt(1, 1);
      ps.setString(2, "Amit");
      ps.setDouble(3, 78.5);
      ps.executeUpdate();
      ps.setInt(1, 2);
      ps.setString(2, "Seeta");
      ps.setDouble(3, 88.2);
      ps.executeUpdate();

      ResultSet rs = con.createStatement().executeQuery(
        "SELECT * FROM student WHERE percentage = (SELECT MAX(percentage) FROM student)"
      );
      while (rs.next()) {
        System.out.println("Topper: " + rs.getString("sname") + " - " + rs.getDouble("percentage"));
      }
      con.close();
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}`,

  "16-Q2A": `activity_main.xml:
<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        android:padding="16dp">

        <TextView android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Line 1" />
        <TextView android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Line 2" />
        <TextView android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Line 3" />
        <TextView android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Line 4" />
        <TextView android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Line 5" />
        <TextView android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Line 6" />
        <TextView android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Line 7" />
        <TextView android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Line 8" />
        <TextView android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Line 9" />
        <TextView android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Line 10" />
    </LinearLayout>
</ScrollView>`,

  "17-Q1A": `VowelDisplay.java:
public class VowelDisplay extends Thread {
  private final String text;

  public VowelDisplay(String text) {
    this.text = text;
  }

  @Override
  public void run() {
    try {
      for (char ch : text.toCharArray()) {
        if ("AEIOUaeiou".indexOf(ch) >= 0) {
          System.out.println(ch);
          Thread.sleep(3000);
        }
      }
    } catch (InterruptedException e) {
      Thread.currentThread().interrupt();
    }
  }

  public static void main(String[] args) {
    new VowelDisplay("Information Technology").start();
  }
}`,

  "17-Q1B": `FileServer.java:
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;

public class FileServer {
  public static void main(String[] args) throws Exception {
    ServerSocket server = new ServerSocket(5000);
    System.out.println("Server started...");
    while (true) {
      Socket socket = server.accept();
      BufferedReader in = new BufferedReader(new java.io.InputStreamReader(socket.getInputStream()));
      PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
      String fileName = in.readLine();
      File file = new File(fileName);
      if (!file.exists()) {
        out.println("File Not Found");
      } else {
        BufferedReader reader = new BufferedReader(new FileReader(file));
        String line;
        while ((line = reader.readLine()) != null) {
          out.println(line);
        }
        reader.close();
      }
      socket.close();
    }
  }
}

FileClient.java:
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

public class FileClient {
  public static void main(String[] args) throws Exception {
    Socket socket = new Socket("localhost", 5000);
    BufferedReader keyboard = new BufferedReader(new InputStreamReader(System.in));
    PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
    BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
    System.out.print("Enter file name: ");
    out.println(keyboard.readLine());
    String line;
    while ((line = in.readLine()) != null) {
      System.out.println(line);
    }
    socket.close();
  }
}`,

  "17-Q2A": `activity_main.xml:
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:orientation="vertical">

    <ImageSwitcher
        android:id="@+id/imageSwitcher"
        android:layout_width="250dp"
        android:layout_height="250dp" />

    <Button
        android:id="@+id/btnNext"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Next" />
</LinearLayout>

MainActivity.java:
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageSwitcher;
import android.widget.ImageView;
import android.widget.ViewSwitcher;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
  private final int[] images = {R.drawable.img1, R.drawable.img2, R.drawable.img3};
  private int index = 0;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    ImageSwitcher imageSwitcher = findViewById(R.id.imageSwitcher);
    Button btnNext = findViewById(R.id.btnNext);

    imageSwitcher.setFactory(new ViewSwitcher.ViewFactory() {
      @Override
      public View makeView() {
        ImageView imageView = new ImageView(MainActivity.this);
        imageView.setScaleType(ImageView.ScaleType.FIT_CENTER);
        imageView.setLayoutParams(new ImageSwitcher.LayoutParams(
          ImageSwitcher.LayoutParams.MATCH_PARENT,
          ImageSwitcher.LayoutParams.MATCH_PARENT
        ));
        return imageView;
      }
    });

    imageSwitcher.setImageResource(images[index]);
    btnNext.setOnClickListener(v -> {
      index = (index + 1) % images.length;
      imageSwitcher.setImageResource(images[index]);
    });
  }
}`,

  "17-Q2B": `activity_main.xml:
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:orientation="vertical"
    android:padding="16dp">

    <TextView
        android:id="@+id/tvDemo"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Long press here for Context Menu"
        android:textSize="18sp" />

    <TextView
        android:id="@+id/tvResult"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:paddingTop="16dp"
        android:textSize="18sp" />
</LinearLayout>

MainActivity.java:
import android.os.Bundle;
import android.view.ContextMenu;
import android.view.MenuItem;
import android.view.View;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
  private TextView tvResult;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    TextView tvDemo = findViewById(R.id.tvDemo);
    tvResult = findViewById(R.id.tvResult);
    registerForContextMenu(tvDemo);
  }

  @Override
  public void onCreateContextMenu(ContextMenu menu, View v, ContextMenu.ContextMenuInfo menuInfo) {
    super.onCreateContextMenu(menu, v, menuInfo);
    menu.setHeaderTitle("Select Option");
    menu.add(0, 1, 0, "Red");
    menu.add(0, 2, 0, "Blue");
    menu.add(0, 3, 0, "Green");
  }

  @Override
  public boolean onContextItemSelected(MenuItem item) {
    tvResult.setText("Selected: " + item.getTitle());
    return true;
  }
}`,

  "18-Q1A": `FactorialSleep.java:
public class FactorialSleep extends Thread {
  private final int number;

  public FactorialSleep(int number) {
    this.number = number;
  }

  @Override
  public void run() {
    long factorial = 1;
    try {
      for (int i = 1; i <= number; i++) {
        factorial *= i;
        Thread.sleep(500);
      }
      System.out.println("Factorial of " + number + " = " + factorial);
    } catch (InterruptedException e) {
      Thread.currentThread().interrupt();
    }
  }

  public static void main(String[] args) {
    new FactorialSleep(5).start();
  }
}`,

  "18-Q2B": `AndroidManifest.xml:
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
</manifest>

activity_main.xml:
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="16dp">

    <Button
        android:id="@+id/btnLocation"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Get Location" />

    <TextView
        android:id="@+id/tvAddress"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:paddingTop="16dp" />
</LinearLayout>

MainActivity.java:
import android.Manifest;
import android.content.pm.PackageManager;
import android.location.Address;
import android.location.Geocoder;
import android.location.Location;
import android.location.LocationManager;
import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import java.util.List;
import java.util.Locale;

public class MainActivity extends AppCompatActivity {
  private TextView tvAddress;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    Button btnLocation = findViewById(R.id.btnLocation);
    tvAddress = findViewById(R.id.tvAddress);

    btnLocation.setOnClickListener(v -> {
      loadLocation();
    });
  }

  private void loadLocation() {
    if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION)
        != PackageManager.PERMISSION_GRANTED) {
      ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, 1);
      return;
    }
    try {
      LocationManager lm = (LocationManager) getSystemService(LOCATION_SERVICE);
      Location location = lm.getLastKnownLocation(LocationManager.GPS_PROVIDER);
      if (location == null) {
        tvAddress.setText("Location not available");
        return;
      }
      Geocoder geocoder = new Geocoder(this, Locale.getDefault());
      List<Address> addresses = geocoder.getFromLocation(location.getLatitude(), location.getLongitude(), 1);
      if (addresses != null && !addresses.isEmpty()) {
        Address address = addresses.get(0);
        tvAddress.setText(
          "Address: " + address.getAddressLine(0)
          + "\\nCity: " + address.getLocality()
        );
      }
    } catch (Exception e) {
      tvAddress.setText(e.getMessage());
    }
  }

  @Override
  public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
    super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    if (requestCode == 1 && grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
      loadLocation();
    }
  }
}`,

  "19-Q1A": `greet.jsp:
<%
java.util.Calendar calendar = java.util.Calendar.getInstance();
int hour = calendar.get(java.util.Calendar.HOUR_OF_DAY);
String message;
if (hour < 12) {
  message = "Good Morning";
} else if (hour < 17) {
  message = "Good Afternoon";
} else {
  message = "Good Evening";
}
%>
<html>
<body>
<h2><%= message %></h2>
</body>
</html>`,

  "19-Q1B": `FirstStudentRecord.java:
import java.awt.FlowLayout;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextField;

public class FirstStudentRecord extends JFrame {
  public FirstStudentRecord() {
    JTextField tfRoll = new JTextField(10);
    JTextField tfName = new JTextField(10);
    JTextField tfPer = new JTextField(10);
    JButton btnShow = new JButton("Show First Record");

    setLayout(new FlowLayout());
    add(new JLabel("Roll No"));
    add(tfRoll);
    add(new JLabel("Name"));
    add(tfName);
    add(new JLabel("Percentage"));
    add(tfPer);
    add(btnShow);

    btnShow.addActionListener(e -> {
      try {
        Class.forName("org.postgresql.Driver");
        Connection con = DriverManager.getConnection("jdbc:postgresql://localhost:5432/college", "postgres", "postgres");
        ResultSet rs = con.createStatement().executeQuery("SELECT * FROM student LIMIT 1");
        if (rs.next()) {
          tfRoll.setText(String.valueOf(rs.getInt(1)));
          tfName.setText(rs.getString(2));
          tfPer.setText(String.valueOf(rs.getDouble(3)));
        }
        con.close();
      } catch (Exception ex) {
        ex.printStackTrace();
      }
    });

    setSize(350, 200);
    setDefaultCloseOperation(EXIT_ON_CLOSE);
    setVisible(true);
  }

  public static void main(String[] args) {
    new FirstStudentRecord();
  }
}`,

  "21-Q1A": `ThreadPriorityDemo.java:
public class ThreadPriorityDemo {
  public static void main(String[] args) {
    Thread t1 = new Thread(() ->
      System.out.println("Thread Name: " + Thread.currentThread().getName() + ", Priority: " + Thread.currentThread().getPriority()),
      "Thread-One"
    );
    Thread t2 = new Thread(() ->
      System.out.println("Thread Name: " + Thread.currentThread().getName() + ", Priority: " + Thread.currentThread().getPriority()),
      "Thread-Two"
    );

    t1.setPriority(Thread.MIN_PRIORITY);
    t2.setPriority(Thread.MAX_PRIORITY);

    t1.start();
    t2.start();
  }
}`,

  "21-Q1B": `StudentServlet.java:
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/student")
public class StudentServlet extends HttpServlet {
  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException {
    String name = req.getParameter("name");
    double m1 = Double.parseDouble(req.getParameter("m1"));
    double m2 = Double.parseDouble(req.getParameter("m2"));
    double m3 = Double.parseDouble(req.getParameter("m3"));
    double percentage = (m1 + m2 + m3) / 3.0;
    String grade = percentage >= 75 ? "A" : percentage >= 60 ? "B" : percentage >= 40 ? "C" : "Fail";

    res.setContentType("text/html");
    PrintWriter out = res.getWriter();
    out.println("<html><body>");
    out.println("<h2>Student Result</h2>");
    out.println("Name: " + name + "<br>");
    out.println("Percentage: " + percentage + "<br>");
    out.println("Grade: " + grade);
    out.println("</body></html>");
  }
}`,

  "22-Q1A": `DateTimeServer.java:
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Date;

public class DateTimeServer {
  public static void main(String[] args) throws Exception {
    ServerSocket server = new ServerSocket(5000);
    System.out.println("Server started...");
    while (true) {
      Socket socket = server.accept();
      PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
      out.println("Server Date and Time: " + new Date());
      socket.close();
    }
  }
}

DateTimeClient.java:
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.Socket;

public class DateTimeClient {
  public static void main(String[] args) throws Exception {
    Socket socket = new Socket("localhost", 5000);
    BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
    System.out.println(in.readLine());
    socket.close();
  }
}`,

  "22-Q2A": `activity_main.xml:
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:orientation="vertical"
    android:padding="16dp">

    <EditText
        android:id="@+id/etName"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Enter Name" />

    <Button
        android:id="@+id/btnGreet"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Greet" />

    <TextView
        android:id="@+id/tvGreeting"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:paddingTop="16dp"
        android:textSize="20sp" />
</LinearLayout>

MainActivity.java:
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
import java.util.Calendar;

public class MainActivity extends AppCompatActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    EditText etName = findViewById(R.id.etName);
    Button btnGreet = findViewById(R.id.btnGreet);
    TextView tvGreeting = findViewById(R.id.tvGreeting);

    btnGreet.setOnClickListener(v -> {
      int hour = Calendar.getInstance().get(Calendar.HOUR_OF_DAY);
      String prefix = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";
      tvGreeting.setText(prefix + ", " + etName.getText().toString());
    });
  }
}`,

  "23-Q1A": `CollegeTable.java:
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.util.Vector;
import javax.swing.JFrame;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.table.DefaultTableModel;

public class CollegeTable extends JFrame {
  public CollegeTable() {
    Vector<String> columns = new Vector<>();
    columns.add("CID");
    columns.add("CName");
    columns.add("Address");

    Vector<Vector<Object>> data = new Vector<>();
    try {
      Class.forName("org.postgresql.Driver");
      Connection con = DriverManager.getConnection("jdbc:postgresql://localhost:5432/college", "postgres", "postgres");
      ResultSet rs = con.createStatement().executeQuery("SELECT * FROM College");
      while (rs.next()) {
        Vector<Object> row = new Vector<>();
        row.add(rs.getInt(1));
        row.add(rs.getString(2));
        row.add(rs.getString(3));
        data.add(row);
      }
      con.close();
    } catch (Exception e) {
      e.printStackTrace();
    }

    JTable table = new JTable(new DefaultTableModel(data, columns));
    add(new JScrollPane(table));
    setSize(500, 300);
    setDefaultCloseOperation(EXIT_ON_CLOSE);
    setVisible(true);
  }

  public static void main(String[] args) {
    new CollegeTable();
  }
}`,

  "24-Q1A": `number.html:
<form action="number.jsp" method="post">
    Enter Number: <input type="text" name="num">
    <input type="submit" value="Convert">
</form>

number.jsp:
<%
String[] words = {"Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"};
String num = request.getParameter("num");
StringBuilder output = new StringBuilder();
for (int i = 0; i < num.length(); i++) {
  output.append(words[num.charAt(i) - '0']).append(" ");
}
%>
<html>
<body>
<h2 style="color:red"><%= output.toString().trim() %></h2>
</body>
</html>`,

  "24-Q1B": `CrudMenu.java:
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Scanner;

public class CrudMenu {
  public static void main(String[] args) {
    try (Scanner sc = new Scanner(System.in)) {
      Class.forName("org.postgresql.Driver");
      Connection con = DriverManager.getConnection("jdbc:postgresql://localhost:5432/college", "postgres", "postgres");
      while (true) {
        System.out.println("1.Insert 2.Update 3.Delete 4.Search 5.Display 6.Exit");
        int choice = sc.nextInt();
        if (choice == 6) {
          break;
        }
        switch (choice) {
          case 1:
            PreparedStatement ps1 = con.prepareStatement("INSERT INTO student VALUES(?,?,?)");
            System.out.print("Roll No: ");
            ps1.setInt(1, sc.nextInt());
            System.out.print("Name: ");
            ps1.setString(2, sc.next());
            System.out.print("Percentage: ");
            ps1.setDouble(3, sc.nextDouble());
            ps1.executeUpdate();
            break;
          case 2:
            PreparedStatement ps2 = con.prepareStatement("UPDATE student SET sname=?, percentage=? WHERE rollno=?");
            System.out.print("New Name: ");
            ps2.setString(1, sc.next());
            System.out.print("New Percentage: ");
            ps2.setDouble(2, sc.nextDouble());
            System.out.print("Roll No: ");
            ps2.setInt(3, sc.nextInt());
            ps2.executeUpdate();
            break;
          case 3:
            PreparedStatement ps3 = con.prepareStatement("DELETE FROM student WHERE rollno=?");
            System.out.print("Roll No: ");
            ps3.setInt(1, sc.nextInt());
            ps3.executeUpdate();
            break;
          case 4:
            PreparedStatement ps4 = con.prepareStatement("SELECT * FROM student WHERE rollno=?");
            System.out.print("Roll No: ");
            ps4.setInt(1, sc.nextInt());
            ResultSet rs1 = ps4.executeQuery();
            while (rs1.next()) {
              System.out.println(rs1.getInt(1) + " " + rs1.getString(2) + " " + rs1.getDouble(3));
            }
            break;
          case 5:
            Statement st = con.createStatement();
            ResultSet rs2 = st.executeQuery("SELECT * FROM student");
            while (rs2.next()) {
              System.out.println(rs2.getInt(1) + " " + rs2.getString(2) + " " + rs2.getDouble(3));
            }
            break;
          default:
            System.out.println("Invalid choice");
        }
      }
      con.close();
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}`,

  "25-Q1A": `FactorServer.java:
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;

public class FactorServer {
  public static void main(String[] args) throws Exception {
    ServerSocket server = new ServerSocket(5000);
    Socket socket = server.accept();
    BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
    PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
    int number = Integer.parseInt(in.readLine());
    StringBuilder factors = new StringBuilder();
    for (int i = 1; i <= number; i++) {
      if (number % i == 0) {
        factors.append(i).append(" ");
      }
    }
    out.println("Factors: " + factors.toString().trim());
    socket.close();
    server.close();
  }
}

FactorClient.java:
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

public class FactorClient {
  public static void main(String[] args) throws Exception {
    Socket socket = new Socket("localhost", 5000);
    BufferedReader keyboard = new BufferedReader(new InputStreamReader(System.in));
    BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
    PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
    System.out.print("Enter number: ");
    out.println(keyboard.readLine());
    System.out.println(in.readLine());
    socket.close();
  }
}`,

  "25-Q1B": `DDLFrame.java:
import java.awt.FlowLayout;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JOptionPane;

public class DDLFrame extends JFrame {
  public DDLFrame() {
    JButton btnCreate = new JButton("Create");
    JButton btnAlter = new JButton("Alter");
    JButton btnDrop = new JButton("Drop");

    setLayout(new FlowLayout());
    add(btnCreate);
    add(btnAlter);
    add(btnDrop);

    btnCreate.addActionListener(e -> executeDDL("CREATE TABLE Employee(id INT PRIMARY KEY, name VARCHAR(50))"));
    btnAlter.addActionListener(e -> executeDDL("ALTER TABLE Employee ADD salary DOUBLE"));
    btnDrop.addActionListener(e -> executeDDL("DROP TABLE Employee"));

    setSize(300, 120);
    setDefaultCloseOperation(EXIT_ON_CLOSE);
    setVisible(true);
  }

  private void executeDDL(String sql) {
    try {
      Class.forName("org.postgresql.Driver");
      Connection con = DriverManager.getConnection("jdbc:postgresql://localhost:5432/college", "postgres", "postgres");
      Statement st = con.createStatement();
      st.executeUpdate(sql);
      JOptionPane.showMessageDialog(this, "Operation successful");
      con.close();
    } catch (Exception e) {
      JOptionPane.showMessageDialog(this, e.getMessage());
    }
  }

  public static void main(String[] args) {
    new DDLFrame();
  }
}`,

  "26-Q1A": `CollegeNames.java:
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;

public class CollegeNames {
  public static void main(String[] args) {
    try {
      Class.forName("org.postgresql.Driver");
      Connection con = DriverManager.getConnection("jdbc:postgresql://localhost:5432/college", "postgres", "postgres");
      ResultSet rs = con.createStatement().executeQuery("SELECT CName FROM College");
      while (rs.next()) {
        System.out.println(rs.getString("CName"));
      }
      con.close();
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}`,

  "26-Q1B": `HobbyServlet.java:
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/hobby")
public class HobbyServlet extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException {
    res.setContentType("text/html");
    PrintWriter out = res.getWriter();
    out.println("<html><body><form method='post'>");
    out.println("<input type='radio' name='hobby' value='Painting'> Painting<br>");
    out.println("<input type='radio' name='hobby' value='Drawing'> Drawing<br>");
    out.println("<input type='radio' name='hobby' value='Singing'> Singing<br>");
    out.println("<input type='radio' name='hobby' value='Swimming'> Swimming<br>");
    out.println("<input type='submit' value='Submit'>");
    out.println("</form></body></html>");
  }

  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException {
    res.setContentType("text/html");
    PrintWriter out = res.getWriter();
    String hobby = req.getParameter("hobby");
    boolean exists = false;
    Cookie[] cookies = req.getCookies();
    if (cookies != null) {
      for (Cookie cookie : cookies) {
        if ("hobby".equals(cookie.getName()) && hobby.equals(cookie.getValue())) {
          exists = true;
          break;
        }
      }
    }
    if (!exists) {
      Cookie cookie = new Cookie("hobby", hobby);
      cookie.setMaxAge(86400);
      res.addCookie(cookie);
      out.println("<h2>Hobby saved successfully.</h2>");
    } else {
      out.println("<h2>Duplicate hobby not allowed.</h2>");
    }
  }
}`,

  "27-Q1A": `teacher.html:
<form action="teacher.jsp" method="post">
    TID: <input type="text" name="tid"><br>
    TName: <input type="text" name="tname"><br>
    Designation: <input type="text" name="desg"><br>
    Subject: <input type="text" name="subject"><br>
    Qualification: <input type="text" name="qual"><br>
    <input type="submit" value="Display">
</form>

teacher.jsp:
<%
String tid = request.getParameter("tid");
String tname = request.getParameter("tname");
String desg = request.getParameter("desg");
String subject = request.getParameter("subject");
String qual = request.getParameter("qual");
%>
<html>
<body>
<h2>Teacher Details</h2>
<table border="1">
    <tr><th>TID</th><th>TName</th><th>Designation</th><th>Subject</th><th>Qualification</th></tr>
    <tr>
        <td><%= tid %></td>
        <td><%= tname %></td>
        <td><%= desg %></td>
        <td><%= subject %></td>
        <td><%= qual %></td>
    </tr>
</table>
</body>
</html>`,

  "27-Q1B": `ScrollRS.java:
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class ScrollRS {
  public static void main(String[] args) {
    try {
      Class.forName("org.postgresql.Driver");
      Connection con = DriverManager.getConnection("jdbc:postgresql://localhost:5432/college", "postgres", "postgres");
      Statement st = con.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
      ResultSet rs = st.executeQuery("SELECT * FROM Teacher");

      if (rs.first()) {
        System.out.println("First: " + rs.getString("TName"));
      }
      if (rs.last()) {
        System.out.println("Last: " + rs.getString("TName"));
      }
      if (rs.previous()) {
        System.out.println("Previous: " + rs.getString("TName"));
      }
      if (rs.absolute(2)) {
        System.out.println("Row 2: " + rs.getString("TName"));
      }
      con.close();
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}`,

  "27-Q2B": `activity_main.xml:
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="16dp">

    <EditText
        android:id="@+id/etNum"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Enter Number"
        android:inputType="number" />

    <TextView
        android:id="@+id/tvResult"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:paddingTop="16dp"
        android:textSize="18sp" />
</LinearLayout>

MainActivity.java:
import android.os.Bundle;
import android.view.ContextMenu;
import android.view.MenuItem;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
  private EditText etNum;
  private TextView tvResult;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    etNum = findViewById(R.id.etNum);
    tvResult = findViewById(R.id.tvResult);
    registerForContextMenu(etNum);
  }

  @Override
  public void onCreateContextMenu(ContextMenu menu, View v, ContextMenu.ContextMenuInfo menuInfo) {
    super.onCreateContextMenu(menu, v, menuInfo);
    menu.setHeaderTitle("Select Operation");
    menu.add(0, 1, 0, "Factorial");
    menu.add(0, 2, 0, "Sum of Digits");
  }

  @Override
  public boolean onContextItemSelected(MenuItem item) {
    int n = Integer.parseInt(etNum.getText().toString());
    if (item.getItemId() == 1) {
      long fact = 1;
      for (int i = 2; i <= n; i++) {
        fact *= i;
      }
      tvResult.setText("Factorial of " + n + " = " + fact);
    } else {
      int sum = 0;
      int temp = n;
      while (temp > 0) {
        sum += temp % 10;
        temp /= 10;
      }
      tvResult.setText("Sum of Digits of " + n + " = " + sum);
    }
    return true;
  }
}`,

  "28-Q1A": `SyncDemo.java:
public class SyncDemo {
  static class Counter {
    private int count = 0;

    synchronized void increment() {
      count++;
    }
  }

  public static void main(String[] args) throws Exception {
    Counter counter = new Counter();
    Thread t1 = new Thread(() -> {
      for (int i = 0; i < 1000; i++) {
        counter.increment();
      }
    });
    Thread t2 = new Thread(() -> {
      for (int i = 0; i < 1000; i++) {
        counter.increment();
      }
    });
    t1.start();
    t2.start();
    t1.join();
    t2.join();
    System.out.println("Count: " + counter.count);
  }
}`,

  "28-Q1B": `EmpChoice.java:
import java.awt.BorderLayout;
import java.awt.Choice;
import java.awt.Panel;
import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Arrays;
import java.util.Vector;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.table.DefaultTableModel;

public class EmpChoice extends JFrame implements ItemListener {
  private final Choice choice = new Choice();
  private final DefaultTableModel model;
  private Connection con;

  public EmpChoice() {
    model = new DefaultTableModel(new Vector<>(), new Vector<>(Arrays.asList("ENo", "EName", "Salary")));
    JTable table = new JTable(model);
    try {
      Class.forName("org.postgresql.Driver");
      con = DriverManager.getConnection("jdbc:postgresql://localhost:5432/college", "postgres", "postgres");
      ResultSet rs = con.createStatement().executeQuery("SELECT ENo FROM Emp");
      choice.add("-- Select EmpNo --");
      while (rs.next()) {
        choice.add(rs.getString("ENo"));
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
    choice.addItemListener(this);

    Panel panel = new Panel();
    panel.add(new JLabel("Select EmpNo"));
    panel.add(choice);
    add(panel, BorderLayout.NORTH);
    add(new JScrollPane(table), BorderLayout.CENTER);
    setSize(450, 300);
    setDefaultCloseOperation(EXIT_ON_CLOSE);
    setVisible(true);
  }

  @Override
  public void itemStateChanged(ItemEvent e) {
    if ("-- Select EmpNo --".equals(choice.getSelectedItem())) {
      return;
    }
    try {
      PreparedStatement ps = con.prepareStatement("SELECT * FROM Emp WHERE ENo = ?");
      ps.setString(1, choice.getSelectedItem());
      ResultSet rs = ps.executeQuery();
      model.setRowCount(0);
      if (rs.next()) {
        model.addRow(new Object[]{rs.getInt("ENo"), rs.getString("EName"), rs.getDouble("Sal")});
      }
    } catch (Exception ex) {
      ex.printStackTrace();
    }
  }

  public static void main(String[] args) {
    new EmpChoice();
  }
}`,

  "29-Q1A": `OddPrime.java:
public class OddPrime {
  static boolean isPrime(int n) {
    if (n < 2) {
      return false;
    }
    for (int i = 2; i * i <= n; i++) {
      if (n % i == 0) {
        return false;
      }
    }
    return true;
  }

  public static void main(String[] args) throws Exception {
    int n = 20;
    Thread odd = new Thread(() -> {
      StringBuilder sb = new StringBuilder("Odd: ");
      for (int i = 1; i <= n; i += 2) {
        sb.append(i).append(" ");
      }
      System.out.println(sb.toString().trim());
    });

    Thread prime = new Thread(() -> {
      StringBuilder sb = new StringBuilder("Prime: ");
      for (int i = 2; i <= n; i++) {
        if (isPrime(i)) {
          sb.append(i).append(" ");
        }
      }
      System.out.println(sb.toString().trim());
    });

    odd.start();
    prime.start();
    odd.join();
    prime.join();
  }
}`,

  "29-Q1B": `SessionServlet.java:
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/session")
public class SessionServlet extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException {
    res.setContentType("text/html");
    PrintWriter out = res.getWriter();
    HttpSession session = req.getSession(true);
    session.setMaxInactiveInterval(120);
    Integer count = (Integer) session.getAttribute("count");
    if (count == null) {
      count = 0;
    }
    count++;
    session.setAttribute("count", count);
    out.println("Session ID: " + session.getId() + "<br>");
    out.println("Max Inactive Interval: " + session.getMaxInactiveInterval() + " seconds<br>");
    out.println("Visit Count: " + count);
  }
}`,

  "29-Q2B": `activity_main.xml:
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="16dp">

    <EditText
        android:id="@+id/etInput"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Enter text or number" />

    <TextView
        android:id="@+id/tvResult"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:paddingTop="16dp"
        android:textSize="18sp" />
</LinearLayout>

MainActivity.java:
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.EditText;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
  private EditText etInput;
  private TextView tvResult;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    etInput = findViewById(R.id.etInput);
    tvResult = findViewById(R.id.tvResult);
  }

  @Override
  public boolean onCreateOptionsMenu(Menu menu) {
    menu.add(0, 1, 0, "Palindrome");
    menu.add(0, 2, 0, "Reverse");
    menu.add(0, 3, 0, "Reverse of Number");
    return true;
  }

  @Override
  public boolean onOptionsItemSelected(MenuItem item) {
    String text = etInput.getText().toString();
    String reversed = new StringBuilder(text).reverse().toString();
    if (item.getItemId() == 1) {
      tvResult.setText(text.equals(reversed) ? text + " is a Palindrome" : text + " is not a Palindrome");
    } else if (item.getItemId() == 2) {
      tvResult.setText("Reverse: " + reversed);
    } else {
      int n = Integer.parseInt(text);
      int revNum = 0;
      while (n > 0) {
        revNum = revNum * 10 + n % 10;
        n /= 10;
      }
      tvResult.setText("Reverse of Number: " + revNum);
    }
    return true;
  }
}`
});

