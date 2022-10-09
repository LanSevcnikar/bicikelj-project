let lines = [
  { x1: 255.221, y1: 43.4731, x2: 195.98, y2: 480.826 },
  { x1: 255.221, y1: 43.4731, x2: 155.872, y2: 121.161 },
  { x1: 195.98, y1: 480.826, x2: 220.625, y2: 641.972 },
  { x1: 195.98, y1: 480.826, x2: 130.912, y2: 493.976 },
  { x1: 155.872, y1: 121.161, x2: 81.2129, y2: 419.615 },
  { x1: 155.872, y1: 121.161, x2: -33.9326, y2: 251.748 },
  { x1: 81.2129, y1: 419.615, x2: 59.8054, y2: 463.212 },
  { x1: 81.2129, y1: 419.615, x2: 79.8168, y2: 462.356 },
  { x1: 60.9446, y1: 502.88, x2: 56.2814, y2: 501.157 },
  { x1: 60.9446, y1: 502.88, x2: 65.4258, y2: 500.665 },
  { x1: 60.9446, y1: 502.88, x2: 60.0513, y2: 507.517 },
  { x1: 56.2814, y1: 501.157, x2: 53.8928, y2: 497.809 },
  { x1: 56.2814, y1: 501.157, x2: 54.5119, y2: 504.605 },
  { x1: 65.4258, y1: 500.665, x2: 68.5314, y2: 500.57 },
  { x1: 65.4258, y1: 500.665, x2: 57.6457, y2: 492.265 },
  { x1: 60.4765, y1: 516.826, x2: 56.3375, y2: 518.02 },
  { x1: 60.4765, y1: 516.826, x2: 58.1161, y2: 512.234 },
  { x1: 60.4765, y1: 516.826, x2: 60.8134, y2: 516.853 },
  { x1: -451.213, y1: 500, x2: -326.311, y2: 436.46 },
  { x1: -451.213, y1: 500, x2: -235.455, y2: 629.161 },
  { x1: 85.7643, y1: 538.526, x2: 92.9664, y2: 524.301 },
  { x1: 85.7643, y1: 538.526, x2: 104.488, y2: 577.786 },
  { x1: 85.7643, y1: 538.526, x2: 80.3632, y2: 535.673 },
  { x1: 69.8059, y1: 524.202, x2: 79.1337, y2: 534.37 },
  { x1: 69.8059, y1: 524.202, x2: 59.8173, y2: 529.082 },
  { x1: 69.8059, y1: 524.202, x2: 69.7678, y2: 524.08 },
  { x1: 79.1337, y1: 534.37, x2: 79.2796, y2: 514.821 },
  { x1: 79.1337, y1: 534.37, x2: 79.358, y2: 534.77 },
  { x1: 79.2796, y1: 514.821, x2: 80.1481, y2: 514.013 },
  { x1: 79.2796, y1: 514.821, x2: 73.4732, y2: 515.919 },
  { x1: 51.3712, y1: 534.798, x2: 54.7704, y2: 537.648 },
  { x1: 51.3712, y1: 534.798, x2: 53.6641, y2: 532.426 },
  { x1: 51.3712, y1: 534.798, x2: 40.4068, y2: 534.367 },
  { x1: 537.858, y1: 1309.82, x2: 220.625, y2: 641.972 },
  { x1: 537.858, y1: 1309.82, x2: -158.729, y2: 675.964 },
  { x1: 220.625, y1: 641.972, x2: 121.295, y2: 592.04 },
  { x1: 54.7704, y1: 537.648, x2: 53.3487, y2: 541.918 },
  { x1: 54.7704, y1: 537.648, x2: 60.3129, y2: 537.151 },
  { x1: 61.552, y1: 509.711, x2: 61.935, y2: 510.21 },
  { x1: 61.552, y1: 509.711, x2: 61.0677, y2: 509.417 },
  { x1: 61.552, y1: 509.711, x2: 68.7069, y2: 505.468 },
  { x1: 61.935, y1: 510.21, x2: 61.7223, y2: 516.035 },
  { x1: 61.935, y1: 510.21, x2: 66.5726, y2: 511.962 },
  { x1: 130.912, y1: 493.976, x2: 92.9664, y2: 524.301 },
  { x1: 130.912, y1: 493.976, x2: 110.164, y2: 493.327 },
  { x1: 92.9664, y1: 524.301, x2: 89.0081, y2: 520.163 },
  { x1: 49.6951, y1: 501.376, x2: 50.4124, y2: 499.206 },
  { x1: 49.6951, y1: 501.376, x2: 52.0931, y2: 504.962 },
  { x1: 49.6951, y1: 501.376, x2: 48.2084, y2: 503.147 },
  { x1: 80.1481, y1: 514.013, x2: 89.0081, y2: 520.163 },
  { x1: 80.1481, y1: 514.013, x2: 81.3542, y2: 508.988 },
  { x1: 89.0081, y1: 520.163, x2: 86.4351, y2: 503.896 },
  { x1: 38.1057, y1: 480.546, x2: 32.507, y2: 491.736 },
  { x1: 38.1057, y1: 480.546, x2: 35.899, y2: 477.168 },
  { x1: 38.1057, y1: 480.546, x2: 42.991, y2: 481.917 },
  { x1: 49.2841, y1: 479.377, x2: 61.0043, y2: 478.721 },
  { x1: 49.2841, y1: 479.377, x2: 47.2164, y2: 474.831 },
  { x1: 49.2841, y1: 479.377, x2: 48.5803, y2: 480.257 },
  { x1: 59.8054, y1: 463.212, x2: 61.0043, y2: 478.721 },
  { x1: 59.8054, y1: 463.212, x2: 51.4846, y2: 466.238 },
  { x1: 61.0043, y1: 478.721, x2: 62.8727, y2: 480.578 },
  { x1: 68.5314, y1: 500.57, x2: 69.0766, y2: 499.936 },
  { x1: 68.5314, y1: 500.57, x2: 69.2786, y2: 504.592 },
  { x1: 81.3542, y1: 508.988, x2: 84.221, y2: 505.471 },
  { x1: 81.3542, y1: 508.988, x2: 72.229, y2: 507.543 },
  { x1: 39.5943, y1: 505.915, x2: 32.3514, y2: 507.343 },
  { x1: 39.5943, y1: 505.915, x2: 40.2254, y2: 505.108 },
  { x1: 39.5943, y1: 505.915, x2: 46.0105, y2: 511.988 },
  { x1: 35.3873, y1: 492.392, x2: 32.9832, y2: 492.137 },
  { x1: 35.3873, y1: 492.392, x2: 40.9843, y2: 490.399 },
  { x1: 35.3873, y1: 492.392, x2: 38.6663, y2: 495.847 },
  { x1: -326.311, y1: 436.46, x2: -263.266, y2: 400.566 },
  { x1: -326.311, y1: 436.46, x2: 20.9285, y2: 515.388 },
  { x1: 32.3514, y1: 507.343, x2: 32.9832, y2: 492.137 },
  { x1: 32.3514, y1: 507.343, x2: 27.8066, y2: 511.982 },
  { x1: 32.507, y1: 491.736, x2: 32.9832, y2: 492.137 },
  { x1: 32.507, y1: 491.736, x2: -101.87, y2: 445.263 },
  { x1: 57.6457, y1: 492.265, x2: 57.8437, y2: 490.988 },
  { x1: 57.6457, y1: 492.265, x2: 53.8928, y2: 497.809 },
  { x1: 57.8437, y1: 490.988, x2: 61.5933, y2: 486.435 },
  { x1: 57.8437, y1: 490.988, x2: 49.0557, y2: 488.561 },
  { x1: 53.8928, y1: 497.809, x2: 52.3604, y2: 497.953 },
  { x1: 62.8727, y1: 480.578, x2: 61.5933, y2: 486.435 },
  { x1: 62.8727, y1: 480.578, x2: 64.3545, y2: 480.512 },
  { x1: 61.5933, y1: 486.435, x2: 70.3348, y2: 496.936 },
  { x1: 59.8173, y1: 529.082, x2: 59.8004, y2: 530.476 },
  { x1: 59.8173, y1: 529.082, x2: 57.2866, y2: 525.343 },
  { x1: 59.8004, y1: 530.476, x2: 53.6641, y2: 532.426 },
  { x1: 59.8004, y1: 530.476, x2: 61.7128, y2: 534.713 },
  { x1: 53.6641, y1: 532.426, x2: 52.1972, y2: 525.86 },
  { x1: 57.2866, y1: 525.343, x2: 55.2253, y2: 524.226 },
  { x1: 57.2866, y1: 525.343, x2: 62.8074, y2: 520.936 },
  { x1: 52.1972, y1: 525.86, x2: 54.0594, y2: 524.43 },
  { x1: 52.1972, y1: 525.86, x2: 42.7571, y2: 529.42 },
  { x1: 42.2874, y1: 515.49, x2: 27.8066, y2: 511.982 },
  { x1: 42.2874, y1: 515.49, x2: 45.5339, y2: 513.068 },
  { x1: 42.2874, y1: 515.49, x2: 41.3649, y2: 522.108 },
  { x1: 27.8066, y1: 511.982, x2: 24.5999, y2: 514.006 },
  { x1: 48.9952, y1: 543.06, x2: 53.3487, y2: 541.918 },
  { x1: 48.9952, y1: 543.06, x2: 51.7678, y2: 549.544 },
  { x1: 48.9952, y1: 543.06, x2: 37.0827, y2: 537.468 },
  { x1: 53.3487, y1: 541.918, x2: 58.2475, y2: 545.812 },
  { x1: 51.7678, y1: 549.544, x2: 57.49, y2: 548.601 },
  { x1: 51.7678, y1: 549.544, x2: 45.7031, y2: 556.437 },
  { x1: 79.8168, y1: 462.356, x2: 80.6642, y2: 465.946 },
  { x1: 79.8168, y1: 462.356, x2: 66.1297, y2: 479.943 },
  { x1: 110.164, y1: 493.327, x2: 80.6642, y2: 465.946 },
  { x1: 110.164, y1: 493.327, x2: 108.204, y2: 493.44 },
  { x1: 80.6642, y1: 465.946, x2: 80.6894, y2: 473.252 },
  { x1: 56.3375, y1: 518.02, x2: 54.9126, y2: 516.583 },
  { x1: 56.3375, y1: 518.02, x2: 55.2253, y2: 524.226 },
  { x1: 54.9126, y1: 516.583, x2: 55.6511, y2: 512.362 },
  { x1: 54.9126, y1: 516.583, x2: 52.7917, y2: 516.373 },
  { x1: 54.0594, y1: 524.43, x2: 55.2253, y2: 524.226 },
  { x1: 54.0594, y1: 524.43, x2: 49.3444, y2: 519.497 },
  { x1: 47.2164, y1: 474.831, x2: 51.4846, y2: 466.238 },
  { x1: 47.2164, y1: 474.831, x2: 44.1868, y2: 473.146 },
  { x1: 51.4846, y1: 466.238, x2: 48.6148, y2: 465.429 },
  { x1: 48.6148, y1: 465.429, x2: 13.9857, y2: 383.914 },
  { x1: 48.6148, y1: 465.429, x2: 42.0726, y2: 465.983 },
  { x1: 35.899, y1: 477.168, x2: 44.1868, y2: 473.146 },
  { x1: 35.899, y1: 477.168, x2: 28.467, y2: 472.443 },
  { x1: 44.1868, y1: 473.146, x2: 41.2792, y2: 467.897 },
  { x1: -263.266, y1: 400.566, x2: -101.87, y2: 445.263 },
  { x1: -263.266, y1: 400.566, x2: -33.9326, y2: 251.748 },
  { x1: -101.87, y1: 445.263, x2: 28.467, y2: 472.443 },
  { x1: -33.9326, y1: 251.748, x2: 13.9857, y2: 383.914 },
  { x1: 13.9857, y1: 383.914, x2: 42.0726, y2: 465.983 },
  { x1: 28.467, y1: 472.443, x2: 41.2792, y2: 467.897 },
  { x1: 42.0726, y1: 465.983, x2: 41.2792, y2: 467.897 },
  { x1: 76.1205, y1: 478.901, x2: 80.6894, y2: 473.252 },
  { x1: 76.1205, y1: 478.901, x2: 82.9863, y2: 485.529 },
  { x1: 76.1205, y1: 478.901, x2: 72.1957, y2: 480.552 },
  { x1: 80.6894, y1: 473.252, x2: 88.1519, y2: 485.222 },
  { x1: 104.488, y1: 577.786, x2: 81.8997, y2: 570.766 },
  { x1: 104.488, y1: 577.786, x2: 121.295, y2: 592.04 },
  { x1: 81.8997, y1: 570.766, x2: 48.7034, y2: 582.288 },
  { x1: 81.8997, y1: 570.766, x2: 75.0087, y2: 567.482 },
  { x1: 121.295, y1: 592.04, x2: 73.098, y2: 597.153 },
  { x1: 73.098, y1: 597.153, x2: 48.7034, y2: 582.288 },
  { x1: 73.098, y1: 597.153, x2: -92.1528, y2: 642.401 },
  { x1: 48.7034, y1: 582.288, x2: 10.3796, y2: 579.694 },
  { x1: -235.455, y1: 629.161, x2: -158.729, y2: 675.964 },
  { x1: -235.455, y1: 629.161, x2: 30.1646, y2: 531.156 },
  { x1: -158.729, y1: 675.964, x2: -92.1528, y2: 642.401 },
  { x1: 23.9121, y1: 568.317, x2: 10.3796, y2: 579.694 },
  { x1: 23.9121, y1: 568.317, x2: 36.3915, y2: 537.79 },
  { x1: 23.9121, y1: 568.317, x2: 26.6415, y2: 567.656 },
  { x1: -92.1528, y1: 642.401, x2: 10.3796, y2: 579.694 },
  { x1: 82.9863, y1: 485.529, x2: 88.1519, y2: 485.222 },
  { x1: 82.9863, y1: 485.529, x2: 77.8822, y2: 487.384 },
  { x1: 108.204, y1: 493.44, x2: 88.1519, y2: 485.222 },
  { x1: 108.204, y1: 493.44, x2: 90.0512, y2: 500.573 },
  { x1: 61.0677, y1: 509.417, x2: 60.0513, y2: 507.517 },
  { x1: 61.0677, y1: 509.417, x2: 58.1161, y2: 512.234 },
  { x1: 60.0513, y1: 507.517, x2: 56.478, y2: 507.969 },
  { x1: 58.1161, y1: 512.234, x2: 55.6511, y2: 512.362 },
  { x1: 55.6511, y1: 512.362, x2: 54.1358, y2: 510.346 },
  { x1: 50.4124, y1: 499.206, x2: 52.3604, y2: 497.953 },
  { x1: 50.4124, y1: 499.206, x2: 44.9698, y2: 498.045 },
  { x1: 52.3604, y1: 497.953, x2: 46.9801, y2: 490.905 },
  { x1: 44.9698, y1: 498.045, x2: 45.608, y2: 491.353 },
  { x1: 44.9698, y1: 498.045, x2: 44.1829, y2: 498.504 },
  { x1: 48.5803, y1: 480.257, x2: 42.991, y2: 481.917 },
  { x1: 48.5803, y1: 480.257, x2: 49.0557, y2: 488.561 },
  { x1: 42.991, y1: 481.917, x2: 40.9843, y2: 490.399 },
  { x1: 49.0557, y1: 488.561, x2: 46.9801, y2: 490.905 },
  { x1: 40.9843, y1: 490.399, x2: 45.608, y2: 491.353 },
  { x1: 45.608, y1: 491.353, x2: 46.9801, y2: 490.905 },
  { x1: 52.0931, y1: 504.962, x2: 49.6683, y2: 506.199 },
  { x1: 52.0931, y1: 504.962, x2: 53.0502, y2: 505.272 },
  { x1: 49.6683, y1: 506.199, x2: 48.6578, y2: 506.477 },
  { x1: 49.6683, y1: 506.199, x2: 52.6446, y2: 507.466 },
  { x1: 64.3545, y1: 480.512, x2: 66.1297, y2: 479.943 },
  { x1: 64.3545, y1: 480.512, x2: 74.757, y2: 491.511 },
  { x1: 66.1297, y1: 479.943, x2: 72.1957, y2: 480.552 },
  { x1: 72.1957, y1: 480.552, x2: 77.8822, y2: 487.384 },
  { x1: 74.757, y1: 491.511, x2: 77.8822, y2: 487.384 },
  { x1: 74.757, y1: 491.511, x2: 74.3699, y2: 494.028 },
  { x1: 60.8134, y1: 516.853, x2: 61.7223, y2: 516.035 },
  { x1: 60.8134, y1: 516.853, x2: 62.8074, y2: 520.936 },
  { x1: 61.7223, y1: 516.035, x2: 66.021, y2: 515.208 },
  { x1: 62.8074, y1: 520.936, x2: 68.082, y2: 522.668 },
  { x1: 48.3183, y1: 507.243, x2: 48.6578, y2: 506.477 },
  { x1: 48.3183, y1: 507.243, x2: 42.8284, y2: 503.314 },
  { x1: 48.3183, y1: 507.243, x2: 47.5563, y2: 511.357 },
  { x1: 48.6578, y1: 506.477, x2: 48.2084, y2: 503.147 },
  { x1: 42.8284, y1: 503.314, x2: 48.2084, y2: 503.147 },
  { x1: 42.8284, y1: 503.314, x2: 42.6801, y2: 503.295 },
  { x1: 65.9024, y1: 546.908, x2: 60.3997, y2: 543.745 },
  { x1: 65.9024, y1: 546.908, x2: 69.2881, y2: 541.656 },
  { x1: 65.9024, y1: 546.908, x2: 70.1181, y2: 562.047 },
  { x1: 60.3997, y1: 543.745, x2: 58.2475, y2: 545.812 },
  { x1: 60.3997, y1: 543.745, x2: 61.0485, y2: 541.881 },
  { x1: 58.2475, y1: 545.812, x2: 57.49, y2: 548.601 },
  { x1: 57.49, y1: 548.601, x2: 62.1443, y2: 555.992 },
  { x1: 79.358, y1: 534.77, x2: 80.3632, y2: 535.673 },
  { x1: 79.358, y1: 534.77, x2: 61.7128, y2: 534.713 },
  { x1: 80.3632, y1: 535.673, x2: 69.2881, y2: 541.656 },
  { x1: 61.7128, y1: 534.713, x2: 60.3129, y2: 537.151 },
  { x1: 60.3129, y1: 537.151, x2: 61.0485, y2: 541.881 },
  { x1: 69.2881, y1: 541.656, x2: 61.0485, y2: 541.881 },
  { x1: 52.7535, y1: 510.126, x2: 54.1358, y2: 510.346 },
  { x1: 52.7535, y1: 510.126, x2: 52.6446, y2: 507.466 },
  { x1: 52.7535, y1: 510.126, x2: 48.5642, y2: 511.491 },
  { x1: 54.1358, y1: 510.346, x2: 56.478, y2: 507.969 },
  { x1: 54.5119, y1: 504.605, x2: 53.0502, y2: 505.272 },
  { x1: 54.5119, y1: 504.605, x2: 56.478, y2: 507.969 },
  { x1: 53.0502, y1: 505.272, x2: 52.6446, y2: 507.466 },
  { x1: 42.6801, y1: 503.295, x2: 40.2254, y2: 505.108 },
  { x1: 42.6801, y1: 503.295, x2: 44.1829, y2: 498.504 },
  { x1: 40.2254, y1: 505.108, x2: 38.6663, y2: 495.847 },
  { x1: 44.1829, y1: 498.504, x2: 38.6663, y2: 495.847 },
  { x1: 86.4351, y1: 503.896, x2: 84.221, y2: 505.471 },
  { x1: 86.4351, y1: 503.896, x2: 90.0512, y2: 500.573 },
  { x1: 84.221, y1: 505.471, x2: 69.0766, y2: 499.936 },
  { x1: 69.0766, y1: 499.936, x2: 70.3348, y2: 496.936 },
  { x1: 70.3348, y1: 496.936, x2: 74.3699, y2: 494.028 },
  { x1: 90.0512, y1: 500.573, x2: 74.3699, y2: 494.028 },
  { x1: 46.0105, y1: 511.988, x2: 45.5339, y2: 513.068 },
  { x1: 46.0105, y1: 511.988, x2: 47.5563, y2: 511.357 },
  { x1: 45.5339, y1: 513.068, x2: 48.3067, y2: 519.352 },
  { x1: 47.5563, y1: 511.357, x2: 48.5642, y2: 511.491 },
  { x1: 48.5642, y1: 511.491, x2: 52.7917, y2: 516.373 },
  { x1: 52.7917, y1: 516.373, x2: 49.3444, y2: 519.497 },
  { x1: 48.3067, y1: 519.352, x2: 49.3444, y2: 519.497 },
  { x1: 48.3067, y1: 519.352, x2: 42.667, y2: 524.637 },
  { x1: 69.7678, y1: 524.08, x2: 68.082, y2: 522.668 },
  { x1: 69.7678, y1: 524.08, x2: 73.4732, y2: 515.919 },
  { x1: 68.082, y1: 522.668, x2: 66.021, y2: 515.208 },
  { x1: 73.4732, y1: 515.919, x2: 71.4055, y2: 513.944 },
  { x1: 66.021, y1: 515.208, x2: 67.2647, y2: 513.491 },
  { x1: 42.667, y1: 524.637, x2: 41.3649, y2: 522.108 },
  { x1: 42.667, y1: 524.637, x2: 42.7571, y2: 529.42 },
  { x1: 41.3649, y1: 522.108, x2: 24.5999, y2: 514.006 },
  { x1: 42.7571, y1: 529.42, x2: 40.4068, y2: 534.367 },
  { x1: 20.9285, y1: 515.388, x2: 24.5999, y2: 514.006 },
  { x1: 20.9285, y1: 515.388, x2: 30.1646, y2: 531.156 },
  { x1: 37.0827, y1: 537.468, x2: 36.3915, y2: 537.79 },
  { x1: 37.0827, y1: 537.468, x2: 40.4068, y2: 534.367 },
  { x1: 36.3915, y1: 537.79, x2: 30.1646, y2: 531.156 },
  { x1: 26.6415, y1: 567.656, x2: 45.7031, y2: 556.437 },
  { x1: 26.6415, y1: 567.656, x2: 75.0087, y2: 567.482 },
  { x1: 45.7031, y1: 556.437, x2: 62.1443, y2: 555.992 },
  { x1: 75.0087, y1: 567.482, x2: 70.1181, y2: 562.047 },
  { x1: 70.1181, y1: 562.047, x2: 62.1443, y2: 555.992 },
  { x1: 68.7069, y1: 505.468, x2: 69.2786, y2: 504.592 },
  { x1: 68.7069, y1: 505.468, x2: 66.5726, y2: 511.962 },
  { x1: 69.2786, y1: 504.592, x2: 72.229, y2: 507.543 },
  { x1: 72.229, y1: 507.543, x2: 71.4055, y2: 513.944 },
  { x1: 71.4055, y1: 513.944, x2: 67.2647, y2: 513.491 },
  { x1: 66.5726, y1: 511.962, x2: 67.2647, y2: 513.491 },
];
