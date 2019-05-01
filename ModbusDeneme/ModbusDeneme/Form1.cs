using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO.Ports;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Windows.Forms;
using Modbus.Device;

namespace ModbusDeneme
{
    public partial class Form1 : Form
    {
        List<string> _items = new List<string>();
        public Form1()
        {
            InitializeComponent();
            
        }

        private void button1_Click(object sender, EventArgs e)
        {
            //çalışan kod
            
            TcpClient TCP_Client = new TcpClient();
            TCP_Client.SendTimeout = 2000;
            TCP_Client.ReceiveTimeout = 2000;
            IAsyncResult result = TCP_Client.BeginConnect("192.168.4.187", 502, null, null);
            
            result.AsyncWaitHandle.WaitOne(2000, true);
            
            ModbusMaster MBus = ModbusIpMaster.CreateIp(TCP_Client);
           
            ushort[] datas = MBus.ReadHoldingRegisters(1, 10, 4);

            for (int i = 0; i < 4; i++)
            {
                _items.Add(datas[i].ToString());
            }
            listBox1.DataSource = _items;

            byte[] b1 = BitConverter.GetBytes(datas[0]);
            byte[] b2 = BitConverter.GetBytes(datas[3]);
            byte[] b3 = new byte[4];
            b3[0] = b1[0];
            b3[1] = b1[1];
            b3[2] = b2[0];
            b3[3] = b2[1];
            long volt = BitConverter.ToInt64(b3, 0);

            label3.Text = volt.ToString();

            TCP_Client.Close();
           
            
            UdpClient udpci = new UdpClient();
            udpci.Connect("192.168.4.187", 502);
            SerialPort sp = new SerialPort("COM1", 115200);
            ModbusMaster MBus = ModbusSerialMaster.CreateRtu(udpci);            
         
            ushort[] datass = MBus.ReadHoldingRegisters(1, 0, 10);
            
            
            SerialPort sp = new SerialPort("COM1", 115000);
            sp.Open();
            ModbusSerialMaster MBus = ModbusSerialMaster.CreateRtu(sp);
            ushort[] readData = MBus.ReadHoldingRegisters(1, 0X1A, 3);
            MBus.Transport.ReadTimeout = 300;
            byte[] b1 = BitConverter.GetBytes(readData[1]);
            byte[] b2 = BitConverter.GetBytes(readData[0]);
            byte[] b3 = new byte[4];
            b3[0] = b1[0];
            b3[1] = b1[1];
            b3[2] = b2[0];
            b3[3] = b2[1];
            float watt = BitConverter.ToSingle(b3, 0);
            
         }

    }
}
