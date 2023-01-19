from kafka import KafkaConsumer


consumer=KafkaConsumer('metrics', bootstrap_servers="ec2-15-165-51-112.ap-northeast-2.compute.amazonaws.com:9092", enable_auto_commit=True, auto_offset_reset='earliest')


for message in consumer:
    print("Topic:{}, Partition: {}, Offset: {}, Key: {}, Value: {}".format( message.topic, message.partition, message.offset, message.key, message.value.decode('utf-8')))
