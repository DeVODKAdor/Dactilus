from __future__ import absolute_import, division, print_function, unicode_literals

import functools
import numpy as np
import tensorflow as tf
import pandas as pd
import tensorflowjs as tfjs

train_file_path = 'C:/Users/Pichau/Desktop/Dactilus/src/model/landmarks.csv'
test_file_path = 'C:/Users/Pichau/Desktop/Dactilus/src/model/landmarksTest.csv'

np.set_printoptions(precision=3, suppress=True)

LABEL_COLUMN = 'sign'
LABELS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]

CSV_COLUMNS = ['sign', 'wrist_x', 'wrist_y', 'thumb_cmc_x', 'thumb_cmc_y', 'thumb_mcp_x', 'thumb_mcp_y', 'thumb_ip_x',
               'thumb_ip_y', 'thumb_tip_x', 'thumb_tip_y', 'index_finger_mcp_x', 'index_finger_mcp_y',
               'index_finger_pip_x', 'index_finger_pip_y', 'index_finger_dip_x', 'index_finger_dip_y',
               'index_finger_tip_x', 'index_finger_tip_y', 'middle_finger_mcp_x', 'middle_finger_mcp_y',
               'middle_finger_pip_x', 'middle_finger_pip_y', 'middle_finger_dip_x', 'middle_finger_dip_y',
               'middle_finger_tip_x', 'middle_finger_tip_y', 'ring_finger_mcp_x', 'ring_finger_mcp_y',
               'ring_finger_pip_x', 'ring_finger_pip_y', 'ring_finger_dip_x', 'ring_finger_dip_y', 'ring_finger_tip_x',
               'ring_finger_tip_y', 'pinky_mcp_x', 'pinky_mcp_y', 'pinky_pip_x', 'pinky_pip_y', 'pinky_dip_x',
               'pinky_dip_y', 'pinky_tip_x', 'pinky_tip_y']


def get_dataset(file_path, **kwargs):
    dataset = tf.data.experimental.make_csv_dataset(
        file_path,
        batch_size=5,  # Artificialmente pequeno para facilitar a exibição de exemplos
        label_name=LABEL_COLUMN,
        na_value="?",
        num_epochs=1,
        ignore_errors=True,
        **kwargs)
    return dataset


raw_train_data = get_dataset(train_file_path)
raw_test_data = get_dataset(test_file_path)


def show_batch(dataset):
    for batch, label in dataset.take(1):
        for key, value in batch.items():
            print("{:20s}: {}".format(key, value.numpy()))


# show_batch(raw_train_data)
DEFAULTS = [0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
            0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
temp_dataset = get_dataset(train_file_path, select_columns=CSV_COLUMNS, column_defaults=DEFAULTS)


# show_batch(temp_dataset)


def pack(features, label):
    return tf.stack(list(features.values()), axis=-1), label


packed_dataset = temp_dataset.map(pack)


class PackNumericFeatures(object):
    def __init__(self, names):
        self.names = names

    def __call__(self, features, labels):
        numeric_features = [features.pop(name) for name in self.names]
        numeric_features = [tf.cast(feat, tf.float32) for feat in numeric_features]
        numeric_features = tf.stack(numeric_features, axis=-1)
        features['numeric'] = numeric_features
        return features, labels


NUMERIC_FEATURES = CSV_COLUMNS[1:]

packed_train_data = raw_train_data.map(PackNumericFeatures(NUMERIC_FEATURES))
packed_test_data = raw_test_data.map(PackNumericFeatures(NUMERIC_FEATURES))

# show_batch(packed_train_data)
example_batch, labels_batch = next(iter(packed_train_data))

desc = pd.read_csv(train_file_path)[NUMERIC_FEATURES].describe()
MEAN = np.array(desc.T['mean'])
STD = np.array(desc.T['std'])


def normalize_numeric_data(data, mean, std):
    # Center the data
    return (data - mean) / std


normalizer = functools.partial(normalize_numeric_data, mean=MEAN, std=STD)

numeric_column = tf.feature_column.numeric_column('numeric', normalizer_fn=normalizer, shape=[len(NUMERIC_FEATURES)])
numeric_columns = [numeric_column]

preprocessing_layer = tf.keras.layers.DenseFeatures(numeric_columns)

model = tf.keras.Sequential([
    preprocessing_layer,
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dense(27, activation='softmax'),
])

model.compile(
    loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=False),
    optimizer='adam',
    metrics=['accuracy'])

train_data = packed_train_data.shuffle(500)
test_data = packed_test_data

model.fit(train_data, epochs=50)

test_loss, test_accuracy = model.evaluate(test_data)

print('\n\nTest Loss {}, Test Accuracy {}'.format(test_loss, test_accuracy))

predictions = model.predict(test_data)

model.save("C:/Users/Pichau/Desktop/modelo")
