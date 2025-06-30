import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
    textAlign: 'center',
  },
  noData: {
    textAlign: 'center',
    color: '#7f8c8d',
    fontSize: 16,
    fontStyle: 'italic',
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 200,
    paddingHorizontal: 10,
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  barWrapper: {
    height: 150,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  bar: {
    backgroundColor: '#3498db',
    borderRadius: 4,
    minHeight: 4,
    width: 20,
  },
  barLabel: {
    fontSize: 10,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 4,
  },
  barValue: {
    fontSize: 10,
    color: '#2c3e50',
    fontWeight: '600',
    textAlign: 'center',
  },
  titleShimmer: {
    marginBottom: 16,
  },
  barShimmer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  },
  labelShimmer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  },
  valueShimmer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  },
}); 