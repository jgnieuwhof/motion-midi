import SerialPort from 'serialport';

const listPorts = () =>
  new Promise((res, rej) =>
    SerialPort.list(
      (err, ports) =>
        err
          ? rej(err)
          : res(
              ports.filter(p =>
                p.manufacturer?.toLowerCase()?.includes('arduino'),
              ),
            ),
    ),
  );

export default listPorts;
