package com.example.apz_pzpi_21_10_krashanytsia_yevhen_task5.component
import android.Manifest
import android.content.Intent
import android.media.MediaPlayer
import android.os.Bundle
import android.view.View
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.ListView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.apz_pzpi_21_10_krashanytsia_yevhen_task5.R
import com.xeinebiu.audioeffects.AudioEffectManager
import com.xeinebiu.audioeffects.AudioEffectViewHelper
import org.json.JSONArray
import java.io.InputStream
import android.bluetooth.BluetoothAdapter
import android.bluetooth.BluetoothDevice
import android.bluetooth.BluetoothSocket
import android.content.pm.PackageManager
import androidx.core.app.ActivityCompat
import java.io.IOException
import java.util.*

class Equalize : AppCompatActivity() {
    private lateinit var audioEffectManager: AudioEffectManager
    private lateinit var audioEffectViewHelper: AudioEffectViewHelper
    private lateinit var mediaPlayer: MediaPlayer
    private var audioSessionId = 0
    private lateinit var songListView: ListView
    private var songs: MutableList<Song> = mutableListOf()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_equalize)

        songListView = findViewById(R.id.song_list)
        loadSongsFromJson()
        setupListView()

        audioSessionId = setupMediaPlayer()
        audioEffectManager = AudioEffectManager(audioSessionId)
        audioEffectViewHelper = AudioEffectViewHelper(
            this,
            supportFragmentManager,
            audioEffectManager
        )
    }

    private fun setupMediaPlayer(): Int {
        mediaPlayer = MediaPlayer.create(this, R.raw.pirate_tavern)
        mediaPlayer.start()
        mediaPlayer.setVolume(.1F, .1F)
        return mediaPlayer.audioSessionId
    }

    override fun onDestroy() {
        super.onDestroy()
        mediaPlayer.stop()
        mediaPlayer.release()
        audioEffectManager.release()
    }

    fun asDialog(view: View) {
        audioEffectViewHelper.showAsDialog()
    }

    fun show(view: View) {
        val equalizer = audioEffectManager.equalizer
        val bandLevelRange = equalizer.bandLevelRange
        val stringBuilder = StringBuilder()

        for (band in 0 until equalizer.numberOfBands) {
            val frequency = equalizer.getCenterFreq(band.toShort())
            val level = equalizer.getBandLevel(band.toShort())

            stringBuilder.append("Frequency: $frequency Hz, Level: $level dB\n")
        }

        // Відображення інформації про частоти і рівні звукових смуг
        Toast.makeText(this, stringBuilder.toString(), Toast.LENGTH_LONG).show()

        // Отримання даних, які хочете відправити на пристрій IoT через Bluetooth
        val dataToSend = "Some data to send to IoT device"

        // Емуляція підключення до IoT-пристрою по Bluetooth
        connectToIoTDevice(dataToSend)

        // Відображення повідомлення користувачу про підключення до пристрою та відправлення даних
        Toast.makeText(this, "Connected to IoT device and sent data: $dataToSend", Toast.LENGTH_SHORT).show()
    }

    private fun loadSongsFromJson() {
        val inputStream: InputStream = resources.openRawResource(R.raw.songs)
        val jsonString = inputStream.bufferedReader().use { it.readText() }
        val jsonArray = JSONArray(jsonString)

        for (i in 0 until jsonArray.length()) {
            val jsonObject = jsonArray.getJSONObject(i)
            val name = jsonObject.getString("name")
            val chordsJsonArray = jsonObject.getJSONArray("chords")
            val chords = mutableListOf<String>()

            for (j in 0 until chordsJsonArray.length()) {
                chords.add(chordsJsonArray.getString(j))
            }

            val song = Song(name, chords)
            songs.add(song)
        }
    }

    private fun setupListView() {
        val songNames = songs.map { it.name }
        val adapter = ArrayAdapter(this, android.R.layout.simple_list_item_1, songNames)
        songListView.adapter = adapter

        songListView.onItemClickListener = AdapterView.OnItemClickListener { _, _, position, _ ->
            val selectedSong = songs[position]
            val intent = Intent(this, ChordDisplayActivity::class.java).apply {
                putExtra("chords", ArrayList(selectedSong.chords))
            }
            startActivity(intent)
        }
    }

    private fun connectToIoTDevice(dataToSend: String) {
        val bluetoothAdapter: BluetoothAdapter? = BluetoothAdapter.getDefaultAdapter()
        if (bluetoothAdapter == null) {
            Toast.makeText(this, "Bluetooth не підтримується на цьому пристрої", Toast.LENGTH_SHORT).show()
            return
        }

        if (!bluetoothAdapter.isEnabled) {
            Toast.makeText(this, "Будь ласка, увімкніть Bluetooth", Toast.LENGTH_SHORT).show()
            return
        }

        val deviceAddress = "00:11:22:33:44:55" 
        val device: BluetoothDevice? = bluetoothAdapter.getRemoteDevice(deviceAddress)
        if (device == null) {
            Toast.makeText(this, "IoT-пристрій не знайдено", Toast.LENGTH_SHORT).show()
            return
        }

        val uuid: UUID = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB") // Стандартний UUID для SPP (Serial Port Profile)
        var socket: BluetoothSocket? = null

        try {
            if (ActivityCompat.checkSelfPermission(
                    this,
                    Manifest.permission.BLUETOOTH_CONNECT
                ) != PackageManager.PERMISSION_GRANTED
            ) {
                // TODO: Consider calling
                //    ActivityCompat#requestPermissions
                // here to request the missing permissions, and then overriding
                //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
                //                                          int[] grantResults)
                // to handle the case where the user grants the permission. See the documentation
                // for ActivityCompat#requestPermissions for more details.
                return
            }
            socket = device.createRfcommSocketToServiceRecord(uuid)
            socket.connect()
            val outputStream = socket.outputStream
            outputStream.write(dataToSend.toByteArray())
            outputStream.flush()
            Toast.makeText(this, "Дані відправлені на IoT-пристрій", Toast.LENGTH_SHORT).show()
        } catch (e: IOException) {
            Toast.makeText(this, "Помилка підключення до IoT-пристрою", Toast.LENGTH_SHORT).show()
            e.printStackTrace()
        } finally {
            socket?.close()
        }
    }
}

data class Song(val name: String, val chords: List<String>)
