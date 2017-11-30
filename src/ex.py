
while 1:
    for sensor in sensors:
        values_for_sensor = read_redis(sensor)

        time = now()

        requests.post('localhost:8080/{}'.format(sensor_id), data= {
            'min': min(values_for_sensor),
            'max': ...
            'avg': avg(...),
            'updated': time
        })

    wait_1_sec()
